'use client'

import { defaultCode } from '@/components/codeEditor/SampleCode';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';


export function useCodeEditor(){
    const editorRef = useRef(null);
    const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
    const [theme, setTheme] = useState(() => nextTheme === 'dark' ? 'vs-dark' : 'light');
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(defaultCode['cpp']);

    useEffect(() => {
        if (nextTheme === 'dark') {
            setTheme('vs-dark');
        } else if (nextTheme === 'light') {
            setTheme('light');
        }
    }, [nextTheme]);

    // function changeTheme() {
    //     console.log("hello theme")
    //     const newTheme = theme === 'vs-dark' ? 'light' : 'vs-dark';
    //     setTheme(newTheme);
    //     localStorage.setItem('CodeEditorTheme', newTheme);
    // }


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

    function changeLanguage(event) {
        console.log(event)
        const newLanguage = event;
        setLanguage(newLanguage);
        setCode(defaultCode[newLanguage]);
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
        // changeTheme, 
        changeLanguage
    }
}