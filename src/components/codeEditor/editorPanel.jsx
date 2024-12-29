'use client';
import { Editor } from '@monaco-editor/react';
import { defaultFile } from './SampleCode';

export function EditorPanel({
    editorRef,
    theme,
    setTheme,
    language,
    setLanguage,
    code,
    setCode,
    fontSize,
    setFontSize
}) {
    function handleEditorChange(value, event) {
        // here is the current value
        setCode(value);
    }

    function handleEditorWillMount(monaco) {
        // console.log('beforeMount: the monaco instance:', monaco);
    }

    function handleEditorValidation(markers) {
        // model markers
        // markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const savedTheme =
            window.localStorage.getItem('CodeEditorTheme') || 'vs-dark';
        const savedLanguage =
            window.localStorage.getItem('PreferredLanguage') || 'cpp';
        const fontSize = window.localStorage.getItem('fontSize') || 14;
        setTheme(savedTheme);
        setLanguage(savedLanguage);
        setCode(defaultFile[savedLanguage].content);
        setFontSize(fontSize)
    }

    return (
        <div className="w-full">
            <Editor
                height="calc(100vh - 88px)"
                language={language}
                value={code}
                theme={theme}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                loading={
                    <div className="flex h-full w-full items-center justify-center bg-[rgb(30,30,30)] hover:cursor-progress"></div>
                }
                options={{
                    fontSize: fontSize,
                }}
            />
        </div>
    );
}
