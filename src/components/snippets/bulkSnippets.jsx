"use client"

import { useEffect, useState } from "react"
import { SnippetCard } from "./card";
import { Search } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import { Input } from "../ui/input";

export function BulkSnippets() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await axios.get('http://localhost:3000/api/snippets');
                console.log(result.data.Snippets);
                setPosts(result.data.Snippets)
            } catch (error) {
                console.error("Error fetching snippets:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div>
            {!posts || loading ? (
                <div className="flex flex-col gap-4 w-[900px]">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="p-4 w-full h-28 gap-4 rounded-xl flex items-center hover:cursor-pointer bg-primary-foreground">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[350px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className=" w-[1200px] mt-16 flex flex-col justify-center items-center ">
                    <div className="flex flex-col gap-10 justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                Welcome to
                            </div>
                            <div className="text-6xl font-bold">
                                <span className="text-[#6c317a] ">Code</span> Runner
                            </div>
                        </div>
                        <div className="mt-10">
                            <Search className="-mb-8 ml-3 h-4" />
                            <Input className='w-[500px] px-4 bg-primary-foreground pl-12 h-12 font-sans text-xl dark:border-white focus-visible:ring-0'
                                placeholder='Search' />
                        </div>
                    </div>

                    <div className=" flex h-10 justify-between w-[900px] mt-24">
                        <div className="rounded-md min-w-36 justify-center bg-slate-400 px-10 flex items-center ">
                            Sort by
                        </div>
                        <div className="rounded-md min-w-36 justify-center bg-slate-400 px-10 flex items-center ">
                            All
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[900px] mb-12 mt-4">
                        {posts.map(snippet => (
                            <SnippetCard
                                snippet_id={snippet.snippet_id}
                                key={snippet.snippet_id}
                                title={snippet.title}
                                content={snippet.description}
                                author={snippet.author.name}
                                date={snippet.created_at.slice(0, 10)}
                            />
                        ))}
                    </div>
                    <Pagination className='mb-20' >
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" >
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    3
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}