import { useEffect, useRef } from 'react';

/**
 * Custom hook for infinite scrolling using IntersectionObserver
 * @param {Object} options
 * @param {boolean} options.hasNextPage - Whether there are more pages to fetch
 * @param {boolean} options.isFetchingNextPage - Whether a fetch is currently in progress
 * @param {Function} options.fetchNextPage - Function to call to fetch the next page
 * @param {React.RefObject} options.scrollRef - (Optional) Ref to the scroll container to record height before loading
 * @param {number} options.threshold - (Optional) Intersection threshold (default: 0.1)
 */
export const useInfiniteScroll = ({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    scrollRef = null,
    threshold = 0.1,
}) => {
    const sentinelRef = useRef(null);
    const prevScrollHeightRef = useRef(0);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Record scroll height before loading more (useful for scroll preservation when loading older items)
                    if (scrollRef?.current) {
                        prevScrollHeightRef.current = scrollRef.current.scrollHeight;
                    }
                    fetchNextPage();
                }
            },
            { threshold }
        );

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
            observer.disconnect();
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, scrollRef, threshold]);

    return {
        sentinelRef,
        prevScrollHeightRef,
    };
};
