import z from 'zod';

//following language id's are allowed, add more if required
//91 - java
//95 - go
// 97 - js
// 100 - py
// 105 - c++
const allowedLanguageIds = [91, 95, 97, 100, 105];

export const createSnippetSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string',
        })
        .trim()
        .min(1, { message: 'Title cannot be an empty' })
        .max(100, {
            message: 'Title must be less than or equal to 100 char',
        }),
    description: z.string().optional(),
    source_code: z
        .string({
            required_error: 'Source code is required',
            invalid_type_error: 'Source code must be a string',
        })
        .trim()
        .min(1, { message: 'Source code cannot be an empty' }),
    language_id: z
        .number({
            required_error: 'Language ID is required',
            invalid_type_error: 'Language ID must be a number',
        })
        .refine((id) => allowedLanguageIds.includes(id), {
            message: 'Language ID is invalid',
        }),
    is_private: z
        .boolean({
            invalid_type_error: 'is_private must be a boolean value',
        })
        .optional(),
});

export const deleteSnippetSchema = z.object({
    snippet_id: z
        .string({
            required_error: 'Snippet Id is required',
        })
        .uuid({ message: 'Snippet Id is invalid' }),
});

export const editSnippetSchema = z.object({
    snippet_id: z
        .string({
            required_error: 'Snippet ID is required',
        })
        .uuid({ message: 'Snippet Id is invalid' }),
    title: z
        .string({
            invalid_type_error: 'Title must be a string',
        })
        .trim()
        .min(1, { message: 'Title cannot be an empty' })
        .max(100, { message: 'Title must be less than or equal to 100 char' })
        .optional(),
    description: z.string().optional(),
    source_code: z
        .string({
            invalid_type_error: 'Source code must be a string',
        })
        .trim()
        .min(1, { message: 'Source code cannot be an empty' })
        .optional(),
    is_private: z
        .boolean({
            invalid_type_error: 'is_private must be a boolean value',
        })
        .optional(),
});
