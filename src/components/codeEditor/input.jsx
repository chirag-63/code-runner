'use client';
import { Textarea } from '@/components/ui/textarea';

export function InputPanel({ input, setInput }) {
    return (
        <div className="h-full w-full text-sm">
            <div className="flex h-7 flex-col items-center justify-around border-2 border-secondary">
                <div className="w-full border-secondary text-center font-mono text-sm">
                    Input
                </div>
            </div>
            <Textarea
                placeholder="Input for the program (optional)."
                className="h-full w-full resize-none rounded-none border-none font-mono focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
}
