'use client';

import { defaultFile } from '@/components/codeEditor/SampleCode';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function useCodeEditor() {
    const editorRef = useRef(null);
    const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
    const [theme, setTheme] = useState(() =>
        nextTheme === 'dark' ? 'vs-dark' : 'light',
    );
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(defaultFile['cpp']?.content);
    const [fileName, setFileName] = useState(defaultFile['cpp'].fileName);
    const [extension, setExtension] = useState(defaultFile['cpp'].extension);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        if (nextTheme === 'dark') {
            setTheme('vs-dark');
        } else if (nextTheme === 'light') {
            setTheme('light');
        }
    }, [nextTheme]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveCode();
            }
        };

        const saveCode = () => {
            // Here, you can implement saving the code
            alert('Code saved');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [code]);

    function changeLanguage(newLanguage) {
        setLanguage(newLanguage);
        setExtension(defaultFile[newLanguage].extension);
        setCode(defaultFile[newLanguage].content);
        localStorage.setItem('PreferredLanguage', newLanguage);
    }

    return {
        editorRef,
        theme,
        setTheme,
        language,
        setLanguage,
        code,
        setCode,
        changeLanguage,
        fileName,
        extension,
        input,
        setInput,
        output,
        setOutput,
    };
}
