import { FormattedMessage } from 'react-intl';

type BannerTextProps = {
    title: string;
};

const BannerText = ({ title }: BannerTextProps) => {
    return (
        <div className="absolute top-0 left-5 flex flex-col gap-y-6 justify-center h-full">
            <h2 className="text-7xl font-bold text-white">{title}</h2>
            <p className="text-lg text-slate-100">
                <FormattedMessage id="banner_one_text_1" /> <br />
                <FormattedMessage id="banner_one_text_2" />
            </p>
            <div className="flex gap-x-4 mt-2">
                <button className="py-3 px-6 rounded-full bg-slate-200 hover:bg-white duration-200 text-sm uppercase font-semibold">
                    <FormattedMessage id="find_out_more" />
                </button>
                <button className="py-3 px-6 rounded-full bg-slate-200 hover:bg-white duration-200 text-sm uppercase font-semibold">
                    <FormattedMessage id="categories_shop_now_lbl" />
                </button>
            </div>
        </div>
    );
};

export default BannerText;
