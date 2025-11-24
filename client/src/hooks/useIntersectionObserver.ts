import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
    options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
    const { threshold = 0, rootMargin = '0px', freezeOnceVisible = false } = options;

    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // If already visible and freeze is enabled, don't observe
        if (freezeOnceVisible && isVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, freezeOnceVisible, isVisible]);

    return [elementRef, isVisible];
}
