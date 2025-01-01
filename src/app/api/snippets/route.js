import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { nodeCache } from '@/lib/nodeCache';

export async function GET(request) {
    const session = await auth();
    if (!session) {
        return redirect('/');
    }


    const cacheKey = `snippets:${session.user?.email}`;
    const cachedData = nodeCache.get(cacheKey);
    if (cachedData) {
        return NextResponse.json(cachedData);
    }

    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        const snippets = await prisma.snippet.findMany({
            where: {
                OR: [{ author_id: user.id }, { is_private: false }],
            },
            select: {
                snippet_id: true,
                title: true,
                description: true,
                source_code: true,
                created_at: true,
                author_id: true,
                language_id: true,
            },
        });

        const snippetsWithDetails = await Promise.all(
            snippets.map(async (snippet) => {
                const author = await prisma.user.findUnique({
                    where: {
                        id: snippet.author_id,
                    },
                    select: {
                        name: true,
                    },
                });

                const language = await prisma.language.findUnique({
                    where: {
                        language_id: snippet.language_id,
                    },
                    select: {
                        language_name: true,
                        extension: true,
                    },
                });

                return {
                    ...snippet,
                    authorName: author?.name || 'Unknown',
                    language: {
                        language_name: language?.language_name || 'Unknown'
                    },
                };
            }),
        );

        const response = {
            Snippets: snippetsWithDetails
        };

        nodeCache.set(cacheKey, response, 120);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}
