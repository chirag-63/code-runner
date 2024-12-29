'use client'

import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Clock, Keyboard } from 'lucide-react';
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
                console.log(response.data.snippet);
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || 'Failed to fetch snippet');
            } finally {
                setLoading(false);
            }
        };
        fetchSnippet();

        setFontSize(localStorage.getItem('fontSize'));
        setSavedTheme(localStorage.getItem('theme'));
    }, []);


    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                loading...
            </div>
        );
    } else if (error) {
        return (
            <div className='flex items-center justify-center h-screen' >
                {error}
            </div>
        );
    } else if (snippet) {
        return (
            <div className="w-[70%] mt-12">
                <div className="flex justify-between px-4">
                    <div className="flex flex-col gap-5 w-[60%]">
                        <div className="text-3xl">
                            {snippet.title}
                        </div>
                        <p>
                            {snippet.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-6">
                        <div className='flex flex-col items-end gap-2'>
                            <div className='flex gap-1 text-lg items-center'>
                                <Keyboard className='h-5' />
                                {snippet.author.name}
                            </div>
                            <div className='flex gap-1 items-center text-sm'>
                                <Clock className='h-5' />
                                {snippet.created_at.slice(0, 10)}
                            </div>
                        </div>
                        <img className='h-14 mr-2'
                            src={`/${snippet.language.language_name}.png`} 
                            alt="language icon" />
                    </div>
                </div>
                <div className="flex flex-col items-center rounded-lg justify-center my-16">
                    <img
                        className="w-[1051px] h-auto select-none pointer-events-none"
                        src="/browser.png"
                        alt="Browser Mockup"
                        draggable="false"
                    />
                    <Editor
                        height="600px"
                        width={"1050px"}
                        language={snippet.language.language_name}
                        value={snippet.source_code}
                        theme={savedTheme == 'dark' ? 'vs-dark' : 'light'}
                        options={{
                            fontSize: fontSize,
                            readOnly: true
                        }}
                        className={`border-b-8 rounded-xl dark:border-[#1E1E1E] border-white`}
                    />
                </div>

            </div>
        );
    }
}