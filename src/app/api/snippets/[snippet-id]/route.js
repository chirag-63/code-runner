import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';

const nodeCache = new NodeCache();

export async function GET(request, { params }) {
    const session = await auth();
    if (!session) {
        return redirect('/');
    }
    const { 'snippet-id': snippetId } = await params;

    if (!snippetId) {
        return NextResponse.json(
            { error: 'Snippet ID is required' },
            { status: 400 },
        );
    }

    const cacheKey = `snippet:${snippetId}`;
    const cachedSnippet = nodeCache.get(cacheKey);
    if (cachedSnippet) {
        return NextResponse.json({ snippet: cachedSnippet });
    }

    const prisma = new PrismaClient();
    try {
        const { id } = await prisma.user.findUnique({
            where: {
                email: session.user?.email,
            },
            select: {
                id: true,
            },
        });
        
        const snippet = await prisma.snippet.findFirst({
            where: {
                AND: [
                    {
                        OR: [{ author_id: id }, { is_private: false }],
                    },
                    { snippet_id: snippetId },
                ],
            },
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

        if (!snippet) {
            return NextResponse.json(
                { error: 'Snippet not found OR Unauthorized' },
                { status: 404 },
            );
        }

        nodeCache.set(cacheKey, snippet, 90);
        return NextResponse.json({ snippet });
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
