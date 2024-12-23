'use client';
import { CodeEditorProvider, useCodeEditorContext } from '@/components/codeEditor/codeEditorContext';
import { Button } from '@/components/ui/button';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CodeEditor } from './editorPanel';
import { InputPanel } from './input';
import { OutputPanel } from './output';
import { ModeToggle } from '../theme-toggle';
import { Download } from 'lucide-react';

function OnlineCompilerContent() {
    const { changeTheme, language, changeLanguage } = useCodeEditorContext();

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-end py-1 items-center gap-5 bg-secondary w-full pr-5">
                <Button className="py-2 w-16 h-7 font-medium bg-green-500 hover:bg-green-600">
                    Run
                </Button>
                <Button className="py-2 w-16 h-7 font-medium">
                    Invite
                </Button>
                <Button className="py-2 w-10 h-7 font-medium">
                    <Download/>
                </Button>
                <Select value={language} onValueChange={changeLanguage}>
                    <SelectTrigger className="w-[120px] h-8 bg-primary-foreground">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md  md:min-w-full">
                <ResizablePanel defaultSize={70} className='min-w-[40%]'>
                    <CodeEditor />
                </ResizablePanel>
                <ResizableHandle withHandle className={"border-2 border-secondary"} />
                <ResizablePanel defaultSize={30} className='min-w-[30%]'>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={40}>
                            <InputPanel />
                        </ResizablePanel>
                        <ResizableHandle withHandle className={"border-2 border-secondary"} />
                        <ResizablePanel defaultSize={60} className='min-h-[35%]'>
                            <OutputPanel />
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
