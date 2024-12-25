'use client';

import { ModeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import SignIn from '../sign-in';

const Navbar = () => {
    return (
        <div className="flex h-12 w-full items-center justify-between gap-6 rounded-none bg-[#693078] bg-card px-4 py-3">
            <ul className="flex items-center gap-10 text-card-foreground">
                <li className="mx-16 flex select-none text-xl font-bold text-white">
                    <Link href="#" onDragStart={(e) => e.preventDefault()}>
                        Code Runner
                    </Link>
                </li>
                <li className="font-medium text-white">
                    <Link href="#" onDragStart={(e) => e.preventDefault()}>
                        Saved Snippets
                    </Link>
                </li>
                <li className="font-medium text-white">
                    <Link href="#" onDragStart={(e) => e.preventDefault()}>
                        Features
                    </Link>
                </li>
            </ul>
            <div className="flex items-center">
                <ModeToggle />
                <SignIn />
            </div>
        </div>
    );
};

export default Navbar;
