'use client'
import React, { createContext, useContext } from 'react';
import { useCodeEditor } from '@/hooks/codeEditorHook';

const CodeEditorContext = createContext();

export function CodeEditorProvider({ children }) {
    const editorState = useCodeEditor();
    return (
        <CodeEditorContext.Provider value={editorState}>
            {children}
        </CodeEditorContext.Provider>
    );
}

export function useCodeEditorContext() {
    return useContext(CodeEditorContext);
}
