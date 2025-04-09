import { useState, useEffect, RefObject } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-based animations
 * @param ref Reference to the element to observe
 * @param options Configuration options
 * @returns Object containing animation states
 */
export default function useScrollAnimation(
    ref: RefObject<HTMLElement>,
    options: ScrollAnimationOptions = {}
) {
    const { threshold = 0.2, triggerOnce = true } = options;
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold,
        };
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (triggerOnce) {
                    setHasTriggered(true);
                    observer.unobserve(entry.target);
                }
            } else {
                if (!triggerOnce || !hasTriggered) {
                    setIsVisible(false);
                }
            }
        }, observerOptions);
        observer.observe(ref.current);
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold, triggerOnce, hasTriggered]);

    return { isVisible, hasTriggered };
} 