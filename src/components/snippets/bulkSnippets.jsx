"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { SnippetCard } from "./card";

export function BulkSnippets() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sort, setSort] = useState("Newest first");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await axios.get('/api/snippets');
                setPosts(result.data.Snippets)
            } catch (error) {
                throw error
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    const filteredPosts = posts.filter(snippet => {
        const lowercaseSearch = debouncedSearch.toLowerCase();
        return (
            snippet.title.toLowerCase().includes(lowercaseSearch) ||
            (snippet.description && snippet.description.toLowerCase().includes(lowercaseSearch)) ||
            (snippet.language && snippet.language.language_name.toLowerCase().includes(lowercaseSearch)) ||
            (snippet.authorName.toLowerCase().includes(lowercaseSearch))
        );
    });

    const sortPosts = (posts) => {
        if (sort === "Newest first") {
            return posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sort === "Oldest first") {
            return posts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sort === "A to Z") {
            return posts.sort((a, b) => a.title.localeCompare(b.title));
        }
        return posts;
    };

    const sortedPosts = sortPosts(filteredPosts);

    return (
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
                    <Input
                        className="w-[500px] px-4 bg-primary-foreground pl-12 h-12 font-sans text-xl border-[#6c317a] dark:border-white focus-visible:ring-0"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className=" flex h-10 justify-end w-[900px] mt-24">
                <Select
                    value={sort}
                    onValueChange={(val) => {
                        setSort(val)
                    }}
                >
                    <SelectTrigger className="w-[200px] h-11 focus:ring-0 border-[#6c317a] dark:border-gray-400">
                        <SelectValue className="text-center" placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Newest first">Newest first</SelectItem>
                            <SelectItem value="Oldest first">Oldest first</SelectItem>
                            <SelectItem value="A to Z">A to Z</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {loading 
                ? <div className="flex flex-col gap-4 w-[900px] mb-12 mt-4">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="p-5 w-full h-28 gap-4 rounded-xl flex items-center hover:cursor-pointer bg-primary-foreground">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-[350px]" />
                                <Skeleton className="h-5 w-[250px]" />
                            </div>
                        </div>
                    ))}
                </div>
                : <div className="flex flex-col gap-4 w-[900px] mb-12 mt-4">
                    {sortedPosts.length === 0 ? (
                        <div className="text-center mt-12 text-lg text-gray-500">
                            No snippets found matching your search.
                        </div>
                    ) : (
                        sortedPosts.map(snippet => (
                            <SnippetCard
                                snippet_id={snippet.snippet_id}
                                key={snippet.snippet_id}
                                title={snippet.title}
                                content={snippet.description}
                                imgurl={snippet.language.language_name}
                                author={snippet.authorName}
                                date={snippet.created_at.slice(0, 10)}
                            />
                        ))
                    )}
                </div>
            }
        </div>
    )
}