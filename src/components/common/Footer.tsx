import { FormattedMessage, useIntl } from 'react-intl';
import { APP_TITLE } from '../../utils/constants';

import { ImGithub } from 'react-icons/im';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaHome,
} from 'react-icons/fa';
import { BsPersonFill, BsPaypal } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

const Footer = () => {
    const intl = useIntl();

    return (
        <footer className="bg-black text-[#949494] py-20 px-20">
            <div className="max-w-screen-xl mx-10 grid grid-cols-4">
                <div className="flex flex-col gap-7">
                    <h2 className="font-bold space-x-1 text-white text-4xl line-through">
                        {APP_TITLE}
                    </h2>
                    <p className="text-white text-sm tracking-wide">
                        &copy; {APP_TITLE} 2023
                    </p>
                    <div className="flex gap-5 text-lg text-gray-400">
                        <ImGithub className="hover:text-white duration-300 cursor-pointer" />
                        <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
                        <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
                        <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
                        <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        <FormattedMessage id="footer_locate_us_lbl" />
                    </h2>
                    <div className="text-base flex flex-col gap-2">
                        <p>MBD, Ruwi, Muscat-Onan</p>
                        <p>
                            <FormattedMessage id="footer_mobile" />: 00968
                            97859628
                        </p>
                        <p>
                            <FormattedMessage id="footer_phone" />: 00968
                            24769821
                        </p>
                        <p>
                            <FormattedMessage id="footer_email" />:
                            bazaar@gmail.com
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        <FormattedMessage id="footer_profile" />
                    </h2>
                    <div className="flex flex-col gap-2 text-base">
                        <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                            <span>
                                <BsPersonFill />
                            </span>
                            <FormattedMessage id="footer_my_account" />
                        </p>
                        <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                            <span>
                                <BsPaypal />
                            </span>
                            <FormattedMessage id="footer_checkout" />
                        </p>
                        <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                            <span>
                                <FaHome />
                            </span>
                            <FormattedMessage id="footer_order_tracking" />
                        </p>
                        <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                            <span>
                                <MdLocationOn />
                            </span>
                            <FormattedMessage id="footer_help_and_support" />
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <input
                        className="bg-transparent border px-4 py-2 text-sm"
                        placeholder={intl.formatMessage({ id: 'footer_email' })}
                        type="text"
                    />
                    <button className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black">
                        <FormattedMessage id="footer_subscribe" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
