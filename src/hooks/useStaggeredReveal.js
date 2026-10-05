import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to stagger reveal cards when section enters viewport.
 * 
 * Rules:
 * 1. Initially, keep all cards hidden.
 * 2. Monitor the target section using an IntersectionObserver (threshold 10%).
 * 3. When at least 10% of the section enters the viewport, start the animation.
 * 4. Stop observing the section so the animation can only start once.
 * 5. Reveal the first card.
 * 6. Wait 280 milliseconds.
 * 7. Reveal the next card.
 * 8. Continue revealing one card every 280 milliseconds.
 * 9. After each reveal, check whether all cards are visible.
 * 10. If cards remain, continue the sequence.
 * 11. Once the final card is revealed, mark the animation as completed.
 * 12. Keep all cards visible permanently.
 * 13. If the user scrolls away and comes back, do not restart or replay the animation.
 * 14. If there are no cards, immediately mark the animation as completed.
 */
export function useStaggeredReveal(itemCount, staggerMs = 90, threshold = 0.1) {
  const sectionRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Rule 14: If there are no cards, immediately mark the animation as completed.
    if (itemCount === undefined || itemCount === null || itemCount <= 0) {
      setIsCompleted(true);
      setVisibleCount(0);
      return;
    }

    // Disable scroll reveal stagger animation on mobile screens (<= 640px)
    if (typeof window !== 'undefined' && window.innerWidth <= 640) {
      setVisibleCount(itemCount);
      setIsCompleted(true);
      return;
    }

    // Rule 13: If already triggered, keep state permanent and do not restart
    if (hasTriggeredRef.current) return;

    const el = sectionRef.current;
    if (!el) return;

    // Rule 2: Monitor target section using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Rule 3: When at least 10% enters viewport
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;

          // Rule 4: Stop observing section so animation can only start once
          observer.unobserve(el);
          observer.disconnect();

          // Rule 5: Reveal the first card immediately
          let current = 1;
          setVisibleCount(1);

          // Rule 9 & 11: Check whether all cards are visible
          if (itemCount === 1) {
            setIsCompleted(true);
            return;
          }

          // Rule 6, 7 & 8: Wait 280ms, reveal next card, continue every 280ms
          const interval = setInterval(() => {
            current += 1;
            setVisibleCount(current);

            // Rule 9, 10 & 11: After each reveal, check if all cards visible
            if (current >= itemCount) {
              clearInterval(interval);
              setIsCompleted(true); // Rule 12: Mark completed, keep visible permanently
            }
          }, staggerMs);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [itemCount, staggerMs, threshold]);

  return { sectionRef, visibleCount, isCompleted };
}
