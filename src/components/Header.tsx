import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store';

import { BiShoppingBag } from 'react-icons/bi';

const Header = () => {
    const { productData } = useAppSelector((state) => state.cart);

    return (
        <header className="flex w-full h-20 items-center bg-white justify-between px-16 border-b-2 sticky top-0 z-50">
            <div>
                <NavLink
                    to="/"
                    className="font-bold space-x-1 text-black text-2xl line-through"
                >
                    BAZAAR
                </NavLink>
            </div>
            <nav className="flex items-center gap-8">
                <ul className="flex items-center gap-8">
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                                    : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                            }
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                                    : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                            }
                            to="/pages"
                        >
                            Pages
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
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                                    : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                            }
                            to="/element"
                        >
                            Element
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-base font-bold text-orange-900 underline underline-offset-2 decoration-[1px] duration-300'
                                    : 'text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300'
                            }
                            to="/blog"
                        >
                            Blog
                        </NavLink>
                    </li>
                </ul>
                <div className="flex items-center gap-5">
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
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'border-[2px] border-orange-800 p-1 rounded-full'
                                : ''
                        }
                        to="/profile"
                    >
                        <img
                            className="rounded-full"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            width={30}
                            height={30}
                            alt="User Profile"
                        />
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
