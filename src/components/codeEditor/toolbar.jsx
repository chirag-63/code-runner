import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { changeLanguage } from '@/lib/changeLanguage';
import { downloadCodeHandler } from '@/lib/downloadCode';
import { RunCodeHandler } from '@/lib/runCode';
import { Download } from 'lucide-react';

export function Toolbar({
    setLoadingOutput,
    setOutput,
    extension,
    fontSize,
    setFontSize,
    code,
    setCode,
    setInput,
    language,
    setLanguage,
    setExtension,
    input,
    setIsPopupOpen,
    session
}) {
    return (
        <div className="flex w-full justify-between gap-5 bg-secondary pr-5">
            <div className="ml-5 flex items-center gap-3 text-sm">
                <div className="flex h-full items-center border-primary bg-white px-3 hover:cursor-pointer dark:bg-[rgb(30,30,30)]">
                    main{extension}
                </div>
            </div>
            <div className="flex items-center gap-5 py-1">
                <Button
                    onClick={async () => {
                        await RunCodeHandler(
                            setLoadingOutput,
                            setOutput,
                            language,
                            code,
                            input,
                        );
                    }}
                    className="h-7 w-16 bg-green-500 py-2 font-medium hover:bg-green-600"
                >
                    Run
                </Button>
                <div className="flex h-full w-32 select-none items-center gap-2 rounded-lg bg-primary-foreground px-3 text-sm hover:cursor-pointer">
                    <div>Font</div>
                    <Slider
                        defaultValue={[fontSize]}
                        max={20}
                        min={12}
                        step={1}
                        onValueChange={(val) =>{
                            setFontSize(val[0])
                            localStorage.setItem('fontSize', val[0]);
                        }}
                    />
                </div>
                <Button disabled={!session} onClick={()=>{
                    setIsPopupOpen(true)
                }} className="h-7 w-16 px-5 py-2 font-medium">
                    Publish
                </Button>
                <Button
                    onClick={() => {
                        downloadCodeHandler(code, extension);
                    }}
                    className="h-7 w-10 py-2 font-medium"
                >
                    <Download />
                </Button>
                <Select
                    value={language}
                    onValueChange={(newLanguage) => {
                        changeLanguage(
                            newLanguage,
                            setLanguage,
                            setExtension,
                            setCode,
                            setInput,
                            setOutput,
                        );
                    }}
                >
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
                            <SelectItem value="go">Go</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
