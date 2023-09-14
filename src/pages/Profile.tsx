import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { toast } from 'react-toastify';

const Profile = () => {
    const intl = useIntl();
    const { logOut } = useFirebaseContext();
    const navigate = useNavigate();

    /**
     * Handles the process of user logout.
     *
     * This function initiates the logout process using the 'logOut' function,
     * and upon successful logout, displays a success toast message and navigates the user to the home page.
     * In case of an error during logout, displays an error toast message.
     *
     * @returns {Promise<void>}
     */
    const handleSignOut = async () => {
        await logOut();
        toast.success(intl.formatMessage({ id: 'auth_sign_out_success' }));
        navigate('/');
    };

    return (
        <div className="w-full flex flex-col dark-theme items-center justify-center gap-10 py-20">
            <Helmet>
                <title>
                    Profile {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <div className="w-full flex items-center justify-center gap-10">
                <button
                    onClick={handleSignOut}
                    className="bg-black text-white dark:bg-white dark:text-black text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
                >
                    <FormattedMessage id="auth_sign_out" />
                </button>
            </div>
        </div>
    );
};

export default Profile;
