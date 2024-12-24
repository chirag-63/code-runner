'use client'

import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import SignIn from "../sign-in";

const Navbar = () => {
    return (
        <div className="container bg-card py-3 px-4 h-12 bg-[#68217a] flex items-center justify-between gap-6 rounded-none">
            <ul className="flex items-center gap-10 text-card-foreground">
                <li className="flex mx-16 select-none text-white text-xl font-bold">
                    <Link href="#" onDragStart={(e) => e.preventDefault()}>
                        Code Runner
                    </Link>
                </li>
                <li className="text-white font-medium">
                    <Link href="#" onDragStart={(e) => e.preventDefault()}>
                        Saved Snippets
                    </Link>
                </li>
                <li className="text-white font-medium">
                    <Link href="#" onDragStart={(e) => e.preventDefault()}>
                        Features
                    </Link>
                </li>
            </ul>
            <div className="flex items-center">
                <ModeToggle/>
                <SignIn/>
            </div>
        </div>
    )
}

export default Navbar;