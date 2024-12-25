'use server';
import axios from 'axios';
import { LANGUAGE_VERSIONS } from '@/components/codeEditor/SampleCode';

const OJ_INSTANCE = axios.create({
    baseURL: process.env.ONLINE_JUDGE_API,
});

export async function executeCode(language, sourceCode, input) {
    try {
        const response = await OJ_INSTANCE.post('/execute', {
            language: language,
            version: LANGUAGE_VERSIONS[language],
            stdin: input,
            files: [
                {
                    content: sourceCode,
                },
            ],
        });
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        throw error;
    }
}
