import { auth } from '@/auth';
import { BulkSnippets } from '@/components/snippets/bulkSnippets';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await auth();
    if (!session?.user) {
        redirect('/');
    }
    return (
        <div className="flex items-center justify-center">
            <BulkSnippets/>
        </div>
    );
}
