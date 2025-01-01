"use client"
import Link from "next/link"
import { Keyboard, Clock } from "lucide-react"
import Image from "next/image"

export function SnippetCard({ snippet_id, imgurl, title, author, date }) {
    return (
        <Link href={`/snippets/${snippet_id}`} >
            <div className="p-5 w-full h-28 hover:bg-accent hover:translate-y-1 transition-all ease-in rounded-xl justify-between flex items-center hover:cursor-pointer bg-primary-foreground ">
                <div className="flex items-center gap-6">
                    <Image height={64} width={64} priority={true}
                        src={`/${imgurl}.png`} alt={`${imgurl} icon`} />
                    <div className="text-2xl font-semibold ">
                        {title}
                    </div>
                </div>
                <div className="flex flex-col  items-end gap-2">
                    <div className='flex gap-1 items-center'>
                        <Keyboard className='h-5' />
                        {author}
                    </div>
                    <div className='flex gap-1 items-center text-sm '>
                        <Clock className='h-5' />
                        {date}
                    </div>
                </div>
            </div>
        </Link>
    )
}
