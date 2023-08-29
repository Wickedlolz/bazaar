import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';

import { toast } from 'react-toastify';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signInWithGoogle, logOut } = useFirebaseContext();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        signInWithGoogle().then(() => {
            navigate('/');
        });
    };

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success('Log Out successfully!');
                navigate('/');
            })
            .catch((error) => {
                const errorString = error.message.substring(9).trim();
                toast.error(errorString);
            });
    };

    return (
        <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
            <div className="w-full flex items-center justify-center gap-10">
                <div
                    onClick={handleGoogleLogin}
                    className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
                >
                    <FcGoogle className="w-8" />
                    <span className="text-sm text-gray-900">
                        Sign in with Google
                    </span>
                </div>
                <button
                    onClick={handleSignOut}
                    className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Login;
