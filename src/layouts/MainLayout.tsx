import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppSelector } from '../store';

interface IProps {
    children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
    const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

    return (
        <div className={isDarkTheme ? 'dark' : ''}>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default MainLayout;
