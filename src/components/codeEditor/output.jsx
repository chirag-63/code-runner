'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import NextTopLoader from 'nextjs-toploader';

export function OutputPanel() {
    // use skeleton loaders
    return (
        <div className="w-full h-full">
            <div className='h-14 flex flex-col justify-around items-center border-2 border-secondary'>
                <div className='text-sm border-b border-secondary text-center w-full font-mono'>
                    Output
                </div>
                <div className='text-xs flex justify-around items-center w-full font-mono'>
                    <div>Time</div>
                    <div>Memory</div>
                </div>
            </div>
            <Textarea
                placeholder="Click on 'Run' to see the Output."
                className="h-full w-full focus:outline-none border-none resize-none text-sm font-mono rounded-none"
                readOnly
                // disabled
            />
        </div>
    );
}
