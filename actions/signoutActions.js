'use server';
import { signOut } from '@/auth';

export async function handleSignOut() {
    try {
        const response = await signOut('google');
        return response;
    } catch (error) {
        throw error;
    }
}
