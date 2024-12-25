'use server';
import { signIn } from '@/auth';

export async function handleSignIn() {
    const response = await signIn('google');
    return response;
}
