'use client'

import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Clock, Keyboard } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import axios from 'axios';

export function Snippet({ snippet_id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snippet, setSnippet] = useState({});
    const [fontSize, setFontSize] = useState(14);
    const [savedTheme, setSavedTheme] = useState('vs-dark');

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/snippets/${snippet_id}`);
                setSnippet(response.data.snippet);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch snippet, try reload');
            } finally {
                setLoading(false);
            }
        };
        fetchSnippet();
        setFontSize(localStorage.getItem('fontSize') || 14);
        setSavedTheme(localStorage.getItem('theme') || 'vs-dark');
    }, []);

    if (error) {
        return (
            <div className='flex items-center justify-center h-screen' >
                Failed to fetch snippet, try reload
            </div>
        );
    }

    const isLoading = loading || !snippet;

    return (
        <div className="w-[70%] mt-12">
            <div className="flex justify-between px-4">
                <div className="flex flex-col gap-5 w-[60%]">
                    <div className="text-3xl">
                        {isLoading ? <Skeleton className="h-8 mt-1 w-[500px]" /> : snippet.title}
                    </div>
                    <div>
                        {isLoading
                            ? <div>
                                <Skeleton className="h-5 mt-1 w-[300px]" />
                                <Skeleton className="h-5 mt-2 w-[300px]" />
                            </div>
                            : snippet.description}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-6">
                    <div className='flex flex-col items-end gap-2'>
                        <div className='flex gap-1 text-lg items-center'>
                            <Keyboard className='h-5' />
                            {isLoading ? <Skeleton className="h-5 mt-1 w-[100px]" /> : snippet.author.authorName}
                        </div>
                        <div className='flex gap-1 items-center text-sm'>
                            <Clock className='h-5' />
                            {isLoading ? <Skeleton className="h-4 mt-2 w-[80px]" /> : snippet.created_at.slice(0, 10)}
                        </div>
                    </div>
                    {isLoading
                        ? <Skeleton className="h-16 w-16 rounded-full" />
                        : <Image height={56} width={56}
                            className="mr-2"
                            priority={true}
                            src={`/${snippet.language.language_name}.png`}
                            alt="language icon"
                        />
                    }
                </div>
            </div>
            <div className="flex flex-col items-center rounded-lg justify-center my-16">
                <img
                    className="w-[1051px] h-auto select-none pointer-events-none"
                    src="/browser.png"
                    alt="Browser Mockup"
                    draggable="false"
                />
                {isLoading
                    ? <div className='h-[600px] w-[1050px] rounded-xl bg-gray-200 dark:bg-[rgb(30,30,30)] hover:cursor-progress'></div>
                    : <Editor
                        height="600px"
                        width={"1050px"}
                        language={snippet.language.language_name === 'c++' ? 'cpp' : snippet.language.language_name}
                        value={snippet.source_code}
                        theme={savedTheme == 'dark' ? 'vs-dark' : 'light'}
                        options={{
                            fontSize: fontSize,
                            readOnly: true
                        }}
                        loading={
                            <div className="flex h-full w-full bg-[rgb(30,30,30)] hover:cursor-progress"></div>
                        }
                        className={`border-b-8 rounded-xl dark:border-[#1E1E1E] border-white`}
                    />
                }
            </div>
        </div>
    );
}