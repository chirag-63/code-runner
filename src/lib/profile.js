import { getUserProfile } from '../../actions/profileAction';

export async function profileHandler(
    setName,
    setEmail,
    setImage,
    setIsProfileOpen,
) {
    setIsProfileOpen(true);
    try {
        const { name, email, image } = await getUserProfile();
        setName(name);
        setEmail(email);
        setImage(image);
    } catch (error) {
        throw error;
        // console.error(error)
    }
}
