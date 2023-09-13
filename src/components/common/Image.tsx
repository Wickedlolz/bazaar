import { memo } from 'react';
import useProgressiveImg from '../../hooks/useProgressiveImg';

type ImageProps = {
    src: string;
    alt: string;
    classes?: string;
    width?: number;
    height?: number;
    lazy?: boolean;
};

const Image = ({ src, classes, alt, width, height, lazy }: ImageProps) => {
    const [source, loading] = useProgressiveImg(src);

    return (
        <img
            src={source as string}
            className={`
                ${classes}  ${
                loading ? 'blur-[20px]' : 'blur-none ease-out duration-300'
            }
            `}
            alt={alt}
            width={width}
            height={height}
            loading={lazy ? 'lazy' : 'eager'}
        />
    );
};

export default memo(Image);
