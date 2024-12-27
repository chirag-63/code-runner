'use client';
import { Textarea } from '@/components/ui/textarea';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function OutputPanel({ output, loadingOutput, theme }) {
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
            {loadingOutput ? (
                <div className="mt-1 px-3">
                    <Skeleton
                        count={2}
                        baseColor={theme == 'vs-dark' ? '#1E1E1E' : '#EBEBEB'}
                        highlightColor={
                            theme == 'vs-dark' ? '#282828' : '#F5F5F5'
                        }
                        width={'90%'}
                        borderRadius={'15%'}
                        height={14}
                    />
                    <Skeleton
                        count={1}
                        baseColor={theme == 'vs-dark' ? '#1E1E1E' : '#EBEBEB'}
                        highlightColor={
                            theme == 'vs-dark' ? '#282828' : '#F5F5F5'
                        }
                        width={'80%'}
                        borderRadius={'15%'}
                        height={14}
                    />
                    <Skeleton
                        count={1}
                        baseColor={theme == 'vs-dark' ? '#1E1E1E' : '#EBEBEB'}
                        highlightColor={
                            theme == 'vs-dark' ? '#282828' : '#F5F5F5'
                        }
                        width={'60%'}
                        borderRadius={'15%'}
                        height={14}
                    />
                </div>
            ) : (
                <Textarea
                    placeholder="Click on 'Run' to see the Output."
                    className="h-full w-full resize-none rounded-none border-none font-mono text-sm focus:outline-none"
                    readOnly
                    value={output}
                />
            )}
        </div>
    );
}
