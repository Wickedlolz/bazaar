import { ReactNode, useEffect, useState } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

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

interface IProps {
    children: ReactNode;
}

const Locales = ({ children }: IProps) => {
    const [messages, setMessages] = useState<
        | Record<string, string>
        | Record<string, MessageFormatElement[]>
        | undefined
    >(undefined);

    useEffect(() => {
        loadLocaleData(navigator.language).then((d) => {
            setMessages(d.default as any);
        });
    }, []);

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
