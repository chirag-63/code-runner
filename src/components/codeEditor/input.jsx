'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useCodeEditorContext } from './codeEditorContext';
import { useTheme } from 'next-themes';

export function InputPanel() {

    return (
        <div className="w-full h-full text-sm">
            <div className='h-7 flex flex-col justify-around items-center border-2 border-secondary'>
                <div className='text-sm border-secondary text-center w-full font-mono'>
                    Input
                </div>
            </div>
            <Textarea
                placeholder="Input for the program (optional)."
                className="h-full w-full focus:outline-none border-none resize-none font-mono rounded-none"
            />
        </div>
    );
}
