'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutHandler } from '@/lib/logout';
import { profileHandler } from '@/lib/profile';
import Link from 'next/link';
import { useState } from 'react';
import SignIn from './sign-in';
import { ThemeToggle } from './theme-toggle';

const Navbar = ({ isAuthenticated }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [name, setName] = useState('loading..');
    const [email, setEmail] = useState('loading..');
    const [image, setImage] = useState('');

    return (
        <div className="flex h-12 w-full items-center justify-between gap-6 rounded-none bg-[#763786] bg-card px-4 py-3">
            <ul className="flex items-center gap-10 text-card-foreground">
                <li className="mx-16 flex select-none text-xl font-bold text-white">
                    <Link href="/" onDragStart={(e) => e.preventDefault()}>
                        Code Runner
                    </Link>
                </li>
                <li
                    className={`font-medium text-white ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <Link
                        href={isAuthenticated ? '/snippets' : '#'}
                        onDragStart={(e) => e.preventDefault()}
                        className={
                            !isAuthenticated
                                ? 'pointer-events-none select-none'
                                : ''
                        }
                        title={
                            !isAuthenticated
                                ? 'Signin to access saved snippets'
                                : ''
                        }
                    >
                        Saved Snippets
                    </Link>
                </li>
            </ul>
            <div className="flex items-center">
                <ThemeToggle />
                {isAuthenticated ? (
                    <div className="ml-4 flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="h-8 w-8 cursor-pointer">
                                    <AvatarImage src={image} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-2 mt-2 w-48">
                                <DropdownMenuLabel className="flex h-8 items-center">
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        profileHandler(
                                            setName,
                                            setEmail,
                                            setImage,
                                            setIsProfileOpen,
                                        );
                                    }}
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    Team
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setIsAlertOpen(true)}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialog
                            open={isAlertOpen}
                            onOpenChange={setIsAlertOpen}
                        >
                            <AlertDialogContent className="bg-primary-foreground">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will Sign out your account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-primary-foreground">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() =>
                                            logoutHandler(setIsAlertOpen)
                                        }
                                    >
                                        Logout
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog
                            open={isProfileOpen}
                            onOpenChange={setIsProfileOpen}
                        >
                            <AlertDialogContent className="bg-primary-foreground">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Profile</AlertDialogTitle>
                                    <AlertDialogDescription className="mt-2 flex flex-col text-base">
                                        <span>Name - {name} </span>
                                        <span>Email - {email}</span>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        Close
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ) : (
                    <SignIn />
                )}
            </div>
        </div>
    );
};

export default Navbar;
