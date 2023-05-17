import { useState, forwardRef } from 'react';
import images from '~/assests/images';

const Image = forwardRef(({ alt, src, ...pros }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handleError = () => {
        setFallBack(images.noImage);
    };
    return <img ref={ref} alt={alt} src={fallBack || src} {...pros} onError={handleError} />;
});

export default Image;
