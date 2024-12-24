
import { handleSignIn } from "../../actions/signinActions";
import { Button } from "./ui/button";

export default function SignIn() {
    const handleClick = async () => {
        try {
            const response = await handleSignIn();
            if (response?.error) {
                console.error("Error during sign-in:", response.error);
            } 
            else {
                console.log("Sign-in successful:", response)
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    return (
        <Button onClick={handleClick} className="bg-primary-foreground text-black font-medium h-9 dark:text-white hover:bg-secondary ml-2 mr-2">
            Sign In
        </Button>
    );
}
