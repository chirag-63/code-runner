import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="">
                <Image
                    height={580}
                    width={580}
                    src="/404-not-found.png"
                    alt="not found"
                    priority={true}
                    draggable={false}
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
