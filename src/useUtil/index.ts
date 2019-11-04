import { useEffect } from 'react';

export const useEndReached = (callback: () => void, offset: number = 200, delay: number = 100) => {
    let timer: number = 0;
    const scrollHandle = () => {
        clearTimeout(timer);
        const doc = document.scrollingElement;
        timer = window.setTimeout(() => {
            const scrollTop = doc!.scrollTop;
            const maxH = doc!.scrollHeight;
            const h = doc!.clientHeight;
            if (maxH <= scrollTop + h + offset) callback();
        }, delay);
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandle);
        return () => document.removeEventListener('scroll', scrollHandle);
    });
};
