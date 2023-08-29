import { Link } from "react-router-dom";
import { useAppSelector } from "../store";

import { BiShoppingBag } from "react-icons/bi";

const Header = () => {
  const { productData } = useAppSelector((state) => state.cart);

  return (
    <header className="flex w-full h-20 items-center bg-white justify-between px-16 border-b-2 sticky top-0 z-50">
      <div>
        <Link
          to="/"
          className="font-bold space-x-1 text-black text-2xl line-through"
        >
          BAZAAR
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <ul className="flex items-center gap-8">
          <li className="text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300">
            <Link to="/element">Element</Link>
          </li>
          <li className="text-base font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] duration-300">
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <Link
            className="text-3xl flex justify-center items-center"
            to="/cart"
          >
            <BiShoppingBag />
            <span className="text-sm font-semibold">{productData.length}</span>
          </Link>
          <Link to="/profile">
            <img
              className="rounded-full"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              width={30}
              height={30}
              alt="User Profile"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
