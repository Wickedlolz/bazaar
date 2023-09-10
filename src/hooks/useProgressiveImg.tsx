import { useState, useEffect } from 'react';

const useProgressiveImg = (imageSource: string) => {
    const [source, setSource] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const img = new Image();
        img.src = imageSource;

        img.onload = () => {
            setSource(img.src);
            setLoading(false);
        };
    }, [imageSource]);

    return [source, loading];
};
export default useProgressiveImg;
