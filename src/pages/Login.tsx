import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signInWithGoogle, signIn } = useFirebaseContext();
    const navigate = useNavigate();
    const intl = useIntl();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
     * Handles the form submission event.
     *
     * @param {FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email.length === 0 || password.length === 0) {
            toast.error('All fields are required!');
            return;
        }

        try {
            await signIn(email, password);
            navigate('/');
        } catch (error) {
            const { message } = error as { message: string };
            toast.error(message);
        }
    };

    return (
        <section className="w-full flex flex-col dark-theme items-center justify-center gap-10 py-20">
            <Helmet>
                <title>
                    Sign In {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <div className="w-full flex flex-col items-center justify-center gap-8">
                <button
                    onClick={handleGoogleLogin}
                    className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 duration-300"
                >
                    <FcGoogle className="w-8" />
                    <span className="text-sm text-gray-900 dark:text-white">
                        <FormattedMessage id="auth_sign_in_with_google" />
                    </span>
                </button>
                <p>OR</p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 border-[1px] rounded-lg shadow-md p-4"
                >
                    <label htmlFor="email">Email</label>
                    <input
                        className="outline-none bg-slate-200 p-2 rounded-md"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email..."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className="outline-none bg-slate-200 p-2 rounded-md"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400 duration-300 mt-3"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
