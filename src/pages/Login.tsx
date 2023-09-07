import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { user, signInWithGoogle, logOut } = useFirebaseContext();
    const navigate = useNavigate();
    const intl = useIntl();

    /**
     * Handles the process of user authentication through Google sign-in.
     *
     * This function initiates the Google sign-in process using the 'signInWithGoogle' function,
     * and upon successful authentication, navigates the user to the home page.
     *
     * @returns {Promise<void>}
     */
    const handleGoogleLogin = async () => {
        await signInWithGoogle();
        navigate('/');
    };

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
                    Login {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <div className="w-full flex items-center justify-center gap-10">
                {!user ? (
                    <div
                        onClick={handleGoogleLogin}
                        className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
                    >
                        <FcGoogle className="w-8" />
                        <span className="text-sm text-gray-900 dark:text-white">
                            <FormattedMessage id="auth_sign_in_with_google" />
                        </span>
                    </div>
                ) : (
                    <button
                        onClick={handleSignOut}
                        className="bg-black text-white dark:bg-white dark:text-black text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
                    >
                        <FormattedMessage id="auth_sign_out" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;
