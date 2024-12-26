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
    const [extension, setExtension] = useState(defaultFile['cpp'].extension);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loadingOutput, setLoadingOutput] = useState(false);
    const [fontSize, setFontSize] = useState(14);

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
            setCode(editorRef.current.getValue());
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
        setInput('');
        setOutput('');
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
        extension,
        input,
        setInput,
        output,
        setOutput,
        loadingOutput,
        setLoadingOutput,
        fontSize,
        setFontSize
    };
}
