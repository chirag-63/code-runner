"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm, Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { getIdFromLanguage } from "@/lib/getLanguageId"
import axios from "axios"
import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod" - problem with this package re-install and check later
// import { createSnippetSchema } from "@/models/zod"


export function PublishPopupForm({ isPopupOpen, setIsPopupOpen, code, language }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        control
    } = useForm({
        defaultValues: {
            private: false,
        },
    })

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("api/snippets/create", {
                title: data.title,
                description: data.description,
                language_id: getIdFromLanguage(language),
                source_code: code,
                is_private: data.is_private
            })
            const snippet_id = res.data.snippet.snippet_id;
            setIsPopupOpen(false)
            router.push(`/snippets/${snippet_id}`)
        } catch (e) {
            const errorMessage = e?.response?.data?.message
            setError("root", {
                message: errorMessage || "something went wrong!!"
            })
            console.error(errorMessage);
        }
    };

    return (
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogContent className="w-[700px] bg-primary-foreground ">
                <DialogHeader>
                    <DialogTitle>Enter snippet details</DialogTitle>
                    <DialogDescription>
                        Fill the following entries. Click on post when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} id="publishForm" className="flex flex-col gap-4 items-center ">
                    <div className="flex w-[80%] text-xl gap-5">
                        <div className="w-[75%] ">
                            <Label className='ml-1' htmlFor="title">Title{"*"}</Label>
                            <Input
                                className="w-full h-12  "
                                id="title"
                                type="text"
                                placeholder="Dijkstra algorithm"
                                {...register("title", {
                                    required: "title is required"
                                })}
                            />
                            {errors.title && <p className="text-red-500 text-sm ml-1 mt-1">{errors.title.message}</p>}
                        </div>
                        <div className="flex items-center mt-7 gap-3 border p-2 rounded-md ">
                            <Label htmlFor="is_private">Private</Label>
                            <Controller
                                name="is_private"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        id="is_private"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="h-32 w-[80%] ">
                        <Label className='ml-1' htmlFor="description">Description</Label>
                        <Textarea
                            className="resize-none h-28 w-full text-xl"
                            id="description"
                            type="text"
                            placeholder="Template code for dijkstra algorithm"
                            {...register("description")}
                        />
                        {errors.description && <p className="text-red-500 text-xs ml-1">{errors.description.message}</p>}
                    </div>
                    <div className="text-sm mt-4 text-gray-500 ">
                        NOTE: code written on editor will be posted.
                    </div>
                    {errors.root && (<div className="text-red-500 text-center text-sm ml-1">{errors.root.message}</div>)}
                </form>
                <DialogFooter>
                    <Button className="px-8 dark:text-white" form="publishForm" type="submit">Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}