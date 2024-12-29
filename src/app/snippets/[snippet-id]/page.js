import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Snippet } from '@/components/snippets/snippet';

export default async function Page({params}) {
    const session = await auth();
    if (!session?.user) {
        redirect('/');
    }

    const { 'snippet-id': snippet_id } = await params;
    console.log(snippet_id)

    return (
        <div className="flex items-center w-full justify-center">
            <Snippet snippet_id={snippet_id} />
        </div>
    );
}
