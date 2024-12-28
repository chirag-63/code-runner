import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { deleteSnippetSchema } from '@/models/zod';
import { fromZodError } from 'zod-validation-error';
import { auth } from '@/auth';

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

        if (snippet.author_id !== session.user?.email) {
            return NextResponse.json(
                { error: 'You are not authorized to delete this snippet' },
                { status: 403 },
            );
        }

        await prisma.snippet.delete({
           where: {snippet_id}
        });

        return NextResponse.json({ 'message':"snippet was deleted" });
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