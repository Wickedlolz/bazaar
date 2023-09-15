import { useNavigate, Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { toast } from 'react-toastify';
import Image from '../components/common/Image';

const Profile = () => {
    const intl = useIntl();
    const { user, logOut } = useFirebaseContext();
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
        <div className="w-full dark-theme">
            <Helmet>
                <title>
                    {intl.formatMessage({ id: 'profile' })}{' '}
                    {intl.formatMessage({ id: 'page_title' }) || ''}
                </title>
            </Helmet>
            <section className="w-full flex flex-col items-center justify-center gap-10 py-20">
                <div className="w-[50%] flex items-center justify-center gap-5">
                    <Image
                        classes="rounded-full"
                        src={user?.photoURL!}
                        width={80}
                        height={80}
                        alt="User Avatar"
                        lazy
                    />
                    <div className="">
                        <p className="font-bold">{user?.displayName}</p>
                        <p className="font-semibold">{user?.email}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <button
                        onClick={handleSignOut}
                        className="bg-black text-white dark:bg-white dark:text-black text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
                    >
                        <FormattedMessage id="auth_sign_out" />
                    </button>
                    <Link
                        to="/order-history"
                        className="bg-black text-white dark:bg-white dark:text-black text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
                    >
                        <FormattedMessage id="profile-your-orders" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Profile;
