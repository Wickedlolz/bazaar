import { ReactNode, useEffect, useState } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';
import { useAppSelector } from '../store';

const loadLocaleData = (locale: string) => {
    switch (locale) {
        case 'bg-BG':
            return import('../utils/localization/bg.json');
        case 'en-US':
            return import('../utils/localization/en.json');
        default:
            return import('../utils/localization/en.json');
    }
};

type LocalesProps = {
    children: ReactNode;
};

const Locales = ({ children }: LocalesProps) => {
    const { lang } = useAppSelector((state) => state.bazaar);
    const [messages, setMessages] = useState<
        | Record<string, string>
        | Record<string, MessageFormatElement[]>
        | undefined
    >(undefined);

    useEffect(() => {
        loadLocaleData(lang).then((d) => {
            setMessages(d.default as any);
        });
    }, [lang]);

    return (
        <>
            {messages && (
                <IntlProvider
                    locale={navigator.language}
                    defaultLocale="en-US"
                    messages={messages}
                >
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

export default Locales;
