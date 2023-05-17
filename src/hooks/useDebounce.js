import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debounceVal, setDebounceVal] = useState(value);
    useEffect(() => {
        const handeler = setTimeout(() => {
            setDebounceVal(value);
            return () => {
                clearTimeout(handeler);
            };
        }, delay);
    }, [value]);

    return debounceVal;
}

export default useDebounce;
