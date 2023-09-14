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
                <div className="flex items-center gap-5">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'border-[2px] border-orange-800 p-1 rounded-full'
                                : ''
                        }
                        to="/login"
                    >
                        <img
                            className="rounded-full"
                            src={
                                user?.photoURL ||
                                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                            }
                            width={30}
                            height={30}
                            alt="User Profile"
                        />
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
