'use client';
import {
    CodeEditorProvider,
    useCodeEditorContext,
} from '@/components/codeEditor/codeEditorContext';
import { Button } from '@/components/ui/button';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CirclePlus, Download } from 'lucide-react';
import { executeCode } from '../../../actions/OnlineJudge';
import { CodeEditor } from './editorPanel';
import { InputPanel } from './input';
import { OutputPanel } from './output';

function OnlineCompilerContent() {
    const {
        theme,
        language,
        changeLanguage,
        extension,
        setOutput,
        output,
        editorRef,
        input,
        setInput,
    } = useCodeEditorContext();

    const runHandler = async () => {
        try {
            const response = await executeCode(
                language,
                editorRef.current.getValue(),
                input,
            );
            setOutput(response.run.output);
            // console.log(response.run.output)
        } catch (error) {
            // console.error("Error executing code:", error);
            throw error;
        }
    };

    const downloadCode = () => {
        const code = editorRef.current.getValue();
        const languageMapping = {
            '.cpp': { mimeType: 'text/x-c++src', fileExtension: 'cpp' },
            '.java': { mimeType: 'text/x-java-source', fileExtension: 'java' },
            '.py': { mimeType: 'text/x-python', fileExtension: 'py' },
            '.js': { mimeType: 'application/javascript', fileExtension: 'js' },
        };

        const { mimeType = 'text/plain', fileExtension = 'txt' } =
            languageMapping[extension] || {};
        if (!mimeType) {
            console.error('Unsupported language extension ' + extension);
            return;
        }
        const blob = new Blob([code], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `main.${fileExtension}`;
        link.click();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex w-full justify-between gap-5 bg-secondary pr-5">
                <div className="ml-5 flex items-center gap-3 text-sm">
                    <div className="flex h-full items-center border-primary bg-white px-3 hover:cursor-pointer dark:bg-[rgb(30,30,30)]">
                        main{extension}
                    </div>
                    <CirclePlus className="hover:shaow-gray-700 h-5 text-gray-500 hover:cursor-pointer hover:shadow-lg" />
                </div>
                <div className="flex items-center gap-5 py-1">
                    <Button
                        onClick={runHandler}
                        className="h-7 w-16 bg-green-500 py-2 font-medium hover:bg-green-600"
                    >
                        Run
                    </Button>
                    <Button className="h-7 w-16 py-2 font-medium">
                        Invite
                    </Button>
                    <Button
                        onClick={downloadCode}
                        className="h-7 w-10 py-2 font-medium"
                    >
                        <Download />
                    </Button>
                    <Select value={language} onValueChange={changeLanguage}>
                        <SelectTrigger className="h-8 w-[120px] bg-primary-foreground">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="cpp">C++</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="javascript">
                                    JavaScript
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md md:min-w-full"
            >
                <ResizablePanel defaultSize={70} className="min-w-[40%]">
                    <CodeEditor />
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
                            className={
                                'border-2 border-secondary hover:border-primary'
                            }
                        />
                        <ResizablePanel defaultSize={60}>
                            <OutputPanel output={output} />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export function OnlineCompiler() {
    return (
        <CodeEditorProvider>
            <OnlineCompilerContent />
        </CodeEditorProvider>
    );
}
