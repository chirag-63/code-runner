import { handleSignOut } from '../../actions/signoutActions';

export const logoutHandler = async (setIsAlertOpen) => {
    await handleSignOut();
    setIsAlertOpen(false);
};
