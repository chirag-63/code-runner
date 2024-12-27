'use client';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { EditorPanel } from './editorPanel';
import { InputPanel } from './input';
import { OutputPanel } from './output';
import { defaultFile } from './SampleCode';
import { Toolbar } from './toolbar';

export function OnlineCodeEditor() {
    const editorRef = useRef(null);
    const [loadingOutput, setLoadingOutput] = useState(false);
    const [language, setLanguage] = useState('cpp');
    const [extension, setExtension] = useState(defaultFile['cpp'].extension);
    const [code, setCode] = useState(defaultFile['cpp']?.content);
    const [fontSize, setFontSize] = useState(14);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const { theme: nextTheme } = useTheme();
    const [theme, setTheme] = useState(() =>
        nextTheme === 'dark' ? 'vs-dark' : 'light',
    );

    useEffect(() => {
        if (nextTheme === 'dark') {
            setTheme('vs-dark');
        } else if (nextTheme === 'light') {
            setTheme('light');
        }
    }, [nextTheme]);

    return (
        <div className="flex flex-col items-center justify-center">
            <Toolbar
                setLoadingOutput={setLoadingOutput}
                setOutput={setOutput}
                extension={extension}
                fontSize={fontSize}
                setFontSize={setFontSize}
                code={code}
                setCode={setCode}
                setInput={setInput}
                language={language}
                setLanguage={setLanguage}
                setExtension={setExtension}
                input={input}
            />

            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md md:min-w-full"
            >
                <ResizablePanel defaultSize={70} className="min-w-[40%]">
                    <EditorPanel
                        theme={theme}
                        setTheme={setTheme}
                        language={language}
                        setLanguage={setLanguage}
                        code={code}
                        setCode={setCode}
                        editorRef={editorRef}
                        fontSize={fontSize}
                    />
                </ResizablePanel>
                <ResizableHandle
                    withHandle
                    className={'border-2 border-secondary hover:border-primary'}
                />
                <ResizablePanel defaultSize={30}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={40}>
                            <InputPanel input={input} setInput={setInput} />
                        </ResizablePanel>
                        <ResizableHandle
                            withHandle
                            className="border-2 border-secondary hover:border-primary"
                        />
                        <ResizablePanel defaultSize={60}>
                            <OutputPanel
                                output={output}
                                loadingOutput={loadingOutput}
                                theme={theme}
                            />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
