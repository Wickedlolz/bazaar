import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../store';

import { BiShoppingBag } from 'react-icons/bi';
import { toggleTheme } from '../../../store/reducers/themeSlice';
import { changeLanguage } from '../../../store/reducers/productsSlice';

const NavLinks = () => {
    const dispatch = useAppDispatch();
    const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
    const { lang } = useAppSelector((state) => state.bazaar);
    const { productData } = useAppSelector((state) => state.cart);
    const [language, setLanguage] = useState<string>(
        lang === 'bg-BG' ? 'EN' : 'BG'
    );

    /**
     * Toggles the application's theme between light and dark mode.
     * This function updates the theme state in the Redux store
     *
     * @returns {void}
     */
    const switchTheme = (): void => {
        dispatch(toggleTheme(null));
    };

    /**
     * Switches the language of the page.
     *
     * @returns {void}
     */
    const switchLanguage = (): void => {
        if (language === 'EN') {
            dispatch(changeLanguage('en-US'));
            setLanguage('BG');
        } else {
            dispatch(changeLanguage('bg-BG'));
            setLanguage('EN');
        }
    };

    return (
        <ul className="flex items-center flex-col sm:flex-row gap-5">
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                            : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                    }
                    to="/"
                >
                    <FormattedMessage id="header_home_btn" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                            : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                    }
                    to="/shop"
                >
                    <FormattedMessage id="header_shop_btn" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                            : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                    }
                    to="/about-us"
                >
                    <FormattedMessage id="header_about_us_btn" />
                </NavLink>
            </li>
            <li>
                <button
                    onClick={switchLanguage}
                    type="button"
                    className={`${
                        isDarkTheme
                            ? 'text-gray-300 border-gray-300'
                            : 'text-gray-800 border-gray-500'
                    } border-2 rounded-lg text-sm p-1`}
                >
                    {language}
                </button>
            </li>
            <li>
                <button
                    id="theme-toggle"
                    onClick={switchTheme}
                    type="button"
                    className={`${
                        isDarkTheme
                            ? 'text-gray-300 border-gray-300'
                            : 'text-gray-800 border-gray-500'
                    } border-2 rounded-lg text-sm p-1`}
                >
                    <svg
                        id="theme-toggle-dark-icon"
                        className={`${isDarkTheme ? 'hidden' : ''} w-5 h-5`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                        id="theme-toggle-light-icon"
                        className={`${isDarkTheme ? '' : 'hidden'} w-5 h-5`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-3xl text-orange-900 flex justify-center items-center text'
                            : 'text-3xl flex justify-center items-center'
                    }
                    to="/cart"
                >
                    <BiShoppingBag />
                    <span className="text-sm font-semibold">
                        {productData.length}
                    </span>
                </NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
