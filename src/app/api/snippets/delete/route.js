import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { deleteSnippetSchema } from '@/models/zod';
import { fromZodError } from 'zod-validation-error';
import { auth } from '@/auth';
import { nodeCache } from '@/lib/nodeCache';

export async function DELETE(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    try {
        const { snippet_id } = await request.json();

        const result = deleteSnippetSchema.safeParse({snippet_id});
        if(!result.success){
            const validationError = fromZodError(result.error)
            return NextResponse.json({
                errorName: validationError.name,
                errorDetails: validationError.details[0].message
            })
        }

        const snippet = await prisma.snippet.findUnique({
            where: { snippet_id },
            select: { author_id: true },
        });

        if (!snippet) {
            return NextResponse.json(
                { error: 'Snippet not found' },
                { status: 404 },
            );
        }

        const { id } = await prisma.user.findUnique({
            where: {
                email: session.user?.email,
            },
            select: {
                id: true,
            },
        });

        if (snippet.author_id !== id) {
            return NextResponse.json(
                { error: 'You are not authorized to delete this snippet' },
                { status: 403 },
            );
        }

        await prisma.snippet.delete({
           where: {snippet_id}
        });

        nodeCache.del(`snippet:${snippet_id}`)
        nodeCache.del(`snippets:${session.user.email}`)
        return NextResponse.json({ 'message':"snippet was deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}