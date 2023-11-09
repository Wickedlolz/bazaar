import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebaseContext } from '../../../contexts/FirebaseContext';
import { APP_TITLE } from '../../../utils/constants';

import { HiMenuAlt3 } from 'react-icons/hi';
import NavLinks from './NavLinks';

const Header = () => {
    const { user } = useFirebaseContext();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const openMenuClickHandler = () => {
        setOpenMenu((state) => !state);
    };

    return (
        <header className="flex w-full flex-col sm:flex-row sm:h-20 h-auto items-center bg-white dark-theme justify-between px-10 border-b-2 sticky top-0 z-50">
            <div className="w-full pt-3 flex justify-between sm:block sm:w-auto">
                <NavLink
                    to="/"
                    className="font-bold space-x-1 text-black dark:text-white text-2xl line-through"
                >
                    {APP_TITLE}
                </NavLink>
                <HiMenuAlt3
                    onClick={openMenuClickHandler}
                    className="text-3xl sm:hidden"
                />
            </div>
            <nav
                className={`${
                    openMenu ? 'flex' : 'hidden'
                } items-center gap-5 flex-col sm:flex sm:flex-row`}
            >
                <NavLinks />
                <div className="flex items-center gap-2">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'border-[2px] border-orange-800 p-1 rounded-full'
                                : ''
                        }
                        to={user ? '/profile' : '/sign-in'}
                    >
                        {user?.photoURL ? (
                            <img
                                className="rounded-full"
                                src={user?.photoURL}
                                width={30}
                                height={30}
                                alt="User Profile"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                            </svg>
                        )}
                    </NavLink>
                    {user && (
                        <p className="text-base font-semibold underline">
                            {user.displayName}
                        </p>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
