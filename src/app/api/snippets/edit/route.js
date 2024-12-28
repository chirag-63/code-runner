import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { fromZodError } from 'zod-validation-error';
import { editSnippetSchema } from '@/models/zod';
import { utcToIst } from '@/lib/convertTime';

export async function PUT(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    try {
        const { snippet_id, title, description, source_code, is_private } =
            await request.json();

        const result = editSnippetSchema.safeParse({
            snippet_id,
            title,
            description,
            source_code,
            is_private,
        });
        if (!result.success) {
            const validationError = fromZodError(result.error);
            return NextResponse.json({
                errorName: validationError.name,
                errorDetails: validationError.details[0].message,
            });
        }

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

        const snippet = await prisma.snippet.updateMany({
            where: {
                snippet_id,
                author_id: user.id,
            },
            data: {
                title,
                description: description || '',
                source_code,
                updated_at: utcToIst(new Date()),
                is_private: is_private ?? false,
            },
        });
        
        if (snippet.count === 0) {
            return NextResponse.json(
                { error: 'Snippet not found or unauthorized' },
                { status: 404 },
            );
        }        

        return NextResponse.json({ snippet }, { status: 200 });
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
