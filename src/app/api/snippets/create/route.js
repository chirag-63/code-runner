import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { fromZodError } from 'zod-validation-error';
import { createSnippetSchema } from '@/models/zod';
import { utcToIst } from '@/lib/convertTime';

export async function POST(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    try {
        const { title, description, source_code, language_id, is_private } =
            await request.json();

        const result = createSnippetSchema.safeParse({
            title,
            description,
            language_id,
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

        const snippet = await prisma.snippet.create({
            data: {
                author_id: user.id,
                title,
                description: description || '',
                source_code,
                created_at: utcToIst(new Date()),
                language_id,
                is_private: is_private ?? false,
            },
            select: {
                snippet_id: true,
            }
        });

        return NextResponse.json({ snippet }, { status: 201 });
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
