import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import { HiOutlineArrowLeft } from 'react-icons/hi';

const EmptyCard = () => {
    const intl = useIntl();

    return (
        <div className="dark-theme">
            <div className="max-w-screen-xl mx-auto py-32 flex flex-col items-center justify-center">
                <Helmet>
                    <title>
                        Cart {intl.formatMessage({ id: 'page_title' }) || ''}
                    </title>
                </Helmet>
                <h2 className="text-base font-semibold text-orange-900">
                    <FormattedMessage id="cart_is_empty_lbl" />
                </h2>
                <Link to="/">
                    <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black dark:hover:text-white duration-300">
                        <span>
                            <HiOutlineArrowLeft />
                        </span>
                        <FormattedMessage id="cart_go_shopping_btn" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EmptyCard;
