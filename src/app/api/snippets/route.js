import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import NodeCache from 'node-cache';

const nodeCache = new NodeCache();

export async function GET(request) {
    const session = await auth();
    if (!session) {
        return redirect('/');
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const cacheKey = `snippets:${page}:${pageSize}`;
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

        const totalSnippets = await prisma.snippet.count();
        const snippets = await prisma.snippet?.findMany({
            where: {
                OR: [{ author_id: user.id }, { is_private: false }],
            },
            skip,
            take,
            select: {
                snippet_id: true,
                title: true,
                description: true,
                source_code: true,
                created_at: true,
                author: {
                    select: {
                        name: true,
                    },
                },
                language: {
                    select: {
                        language_name: true,
                        extension: true,
                    },
                },
            },
        });

        const totalPages = Math.ceil(totalSnippets / pageSize);
        const response = {
            Snippets: snippets,
            pagination: {
                totalSnippets,
                totalPages,
                currentPage: page,
                pageSize,
            },
        };

        nodeCache.set(cacheKey, response, 90);
        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}
