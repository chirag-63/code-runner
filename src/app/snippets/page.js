import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await auth();
    if (!session?.user) {
        redirect('/');
    }
    return (
        <div className="flex h-screen items-center justify-center text-lg">
            Coming Soon
        </div>
    );
}
