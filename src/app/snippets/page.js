import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await auth();
    if(!session?.user){
        redirect("/")
    }
    return (
        <div className="flex justify-center items-center text-lg h-screen ">
            Coming Soon
        </div>
    )
}