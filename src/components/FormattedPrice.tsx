import { FormattedPriceProps } from '../types';

const FormattedPrice = ({ amount, className }: FormattedPriceProps) => {
    const formattedAmount = Number(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    });

    return <span className={className}>{formattedAmount}</span>;
};

export default FormattedPrice;
