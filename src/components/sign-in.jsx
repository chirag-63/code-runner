import { handleSignIn } from '../../actions/signinActions';
import { Button } from './ui/button';

export default function SignIn() {
    const handleClick = async () => {
        try {
            const response = await handleSignIn();
            if (response?.error) {
                // console.error('Error during sign-in:', response.error);
            } else {
                // console.log('Sign-in successful:', response);
            }
        } catch (error) {
            throw error
            // console.error('Error during sign-in:', error);
        }
    };

    return (
        <Button
            onClick={handleClick}
            className="ml-2 mr-2 h-9 bg-primary-foreground font-medium text-black hover:bg-secondary dark:text-white"
        >
            <img className='h-4' src="google.png" alt="" />
            Sign In
        </Button>
    );
}
