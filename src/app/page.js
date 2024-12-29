import { auth } from '@/auth';
import { OnlineCodeEditor } from '@/components/codeEditor/onlineCodeEditor';

export default async function Page() {
    const session = await auth();

    return <OnlineCodeEditor session={session} />;
}

//use components like drawer, toast
// signin to save and toast for code saved
// 7. Database for code snippets. ---- EASY
// learn state management library, dont use normal inbuilt hooks of react
