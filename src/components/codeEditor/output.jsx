'use client';
import { Textarea } from '@/components/ui/textarea';

export function OutputPanel({ output }) {
    return (
        <div className="h-full w-full">
            <div className="flex h-7 flex-col items-center justify-around border-2 border-secondary">
                <div className="w-full border-secondary text-center font-mono text-sm">
                    Output
                </div>
                {/* <div className='text-xs flex justify-around items-center w-full font-mono'>
                    <div>Time</div>
                    <div>Memory</div>
                </div> */}
            </div>
            <Textarea
                placeholder="Click on 'Run' to see the Output."
                className="h-full w-full resize-none rounded-none border-none font-mono text-sm focus:outline-none"
                readOnly
                value={output}
            />
        </div>
    );
}
