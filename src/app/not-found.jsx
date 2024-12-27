import Link from 'next/link';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';

export default async function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="">
                <img
                    className="h-[580px]"
                    src="404-not-found.png"
                    alt="not found"
                />
            </div>
            <Button>
                <Link href="/" className="w-40 dark:text-white">
                    Home Page
                </Link>
            </Button>
        </div>
    );
}
