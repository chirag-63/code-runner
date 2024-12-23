'use client'
import { useCodeEditorContext } from '@/components/codeEditor/codeEditorContext';
import { Editor } from "@monaco-editor/react";
import { defaultCode } from './SampleCode';


export function CodeEditor() {
    const {
        editorRef,
        theme, setTheme,
        language, setLanguage,
        code, setCode,
    } = useCodeEditorContext();

    function handleEditorChange(value, event) {
        // here is the current value
    };

    function handleEditorWillMount(monaco) {
        // console.log('beforeMount: the monaco instance:', monaco);
    }

    function handleEditorValidation(markers) {
        // model markers
        // markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const savedTheme = window.localStorage.getItem('CodeEditorTheme') || 'vs-dark';
        const savedLanguage = window.localStorage.getItem('PreferredLanguage') || 'cpp';
        setTheme(savedTheme);
        setLanguage(savedLanguage);
        setCode(defaultCode[savedLanguage]);

        const model = editorRef.current.getModel();
        if (model) {
            monaco.editor.setModelLanguage(model, language);
            model.setValue(defaultCode[language]);
        }
    }

    return (
        <div className='w-full'>
            <Editor
                height="88vh"
                language={language}
                value={code}
                theme={theme}
                onMount={handleEditorDidMount}
                loading={
                    <div className="custom-loader w-full h-full flex items-center justify-center">
                        <div className="loader">
                            <span>Add Custom Skeleton Loaders...</span>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
