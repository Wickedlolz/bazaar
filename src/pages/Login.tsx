import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signInWithGoogle } = useFirebaseContext();
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

    return (
        <div className="w-full flex flex-col dark-theme items-center justify-center gap-10 py-20">
            <Helmet>
                <title>
                    Login {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <div className="w-full flex items-center justify-center gap-10">
                <div
                    onClick={handleGoogleLogin}
                    className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
                >
                    <FcGoogle className="w-8" />
                    <span className="text-sm text-gray-900 dark:text-white">
                        <FormattedMessage id="auth_sign_in_with_google" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
