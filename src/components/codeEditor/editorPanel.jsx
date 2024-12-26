'use client';
import { useCodeEditorContext } from '@/components/codeEditor/codeEditorContext';
import { Editor } from '@monaco-editor/react';
import { defaultFile } from './SampleCode';

export function CodeEditor() {
    const { editorRef, theme, setTheme, language, setLanguage, code, setCode, fontSize
    } = useCodeEditorContext();

    function handleEditorChange(value, event) {
        // here is the current value
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
        setTheme(savedTheme);
        setLanguage(savedLanguage);
        setCode(defaultFile[savedLanguage].content);

        const model = editorRef.current.getModel();
        if (model) {
            monaco.editor.setModelLanguage(model, language);
            model.setValue(defaultFile[language]?.content);
        }
    }

    return (
        <div className="w-full">
            <Editor
                height="calc(100vh - 88px)"
                language={language}
                value={code}
                theme={theme}
                onMount={handleEditorDidMount}
                loading={
                    <div className="flex h-full w-full items-center bg-[rgb(30,30,30)] justify-center"></div>
                }
                options={{
                    fontSize: fontSize
                }}
            />
        </div>
    );
}
