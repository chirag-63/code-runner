'use server';
import { signIn } from '@/auth';

export async function handleSignIn() {
    try {
        const response = await signIn('google', { redirectTo: '/' });
        return response;
    } catch (error) {
        throw error;
    }
}
