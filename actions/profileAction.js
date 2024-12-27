'use server';
import { auth } from '@/auth';

export async function getUserProfile() {
    try {
        const session = await auth();
        const name = session.user?.name;
        const email = session.user?.email;
        const image = session.user?.image;
        return {
            name,
            email,
            image,
        };
    } catch (error) {
        throw error;
    }
}
