import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { customClass?: string }>(
    ({ customClass, ...rest }, ref) => (
        <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
    )
);
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: ReturnType<typeof makeSlot>, skew: number) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    });

interface CardSwapProps {
    width?: number;
    height?: number;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (index: number) => void;
    skewAmount?: number;
    easing?: 'elastic' | 'smooth';
    children: React.ReactNode;
}

export interface CardSwapRef {
    swap: () => void;
    reverseSwap: () => void;
    jumpTo: (index: number) => void;
}

const CardSwap = forwardRef<CardSwapRef, CardSwapProps>((
    {
        width = 500,
        height = 400,
        cardDistance = 60,
        verticalDistance = 70,
        delay = 5000,
        pauseOnHover = false,
        onCardClick,
        skewAmount = 6,
        easing = 'elastic',
        children
    },
    ref
) => {
    const config = useMemo(() =>
        easing === 'elastic'
            ? {
                ease: 'elastic.out(0.6,0.9)',
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05
            }
            : {
                ease: 'power1.inOut',
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2
            }, [easing]);

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(
        () => childArr.map(() => React.createRef<HTMLDivElement>()),
        [childArr.length]
    );

    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number>();
    const container = useRef<HTMLDivElement>(null);

    const swap = () => {
        if (order.current.length < 2) return;

        const [front, ...rest] = order.current;
        const elFront = refs[front].current;
        if (!elFront) return;

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(elFront, {
            y: '+=500',
            duration: config.durDrop,
            ease: config.ease
        });

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
            const el = refs[idx].current;
            if (!el) return;
            const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
            tl.set(el, { zIndex: slot.zIndex }, 'promote');
            tl.to(
                el,
                {
                    x: slot.x,
                    y: slot.y,
                    z: slot.z,
                    duration: config.durMove,
                    ease: config.ease
                },
                `promote+=${i * 0.15}`
            );
        });

        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
        tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
        tl.call(
            () => {
                gsap.set(elFront, { zIndex: backSlot.zIndex });
            },
            undefined,
            'return'
        );
        tl.to(
            elFront,
            {
                x: backSlot.x,
                y: backSlot.y,
                z: backSlot.z,
                duration: config.durReturn,
                ease: config.ease
            },
            'return'
        );

        tl.call(() => {
            order.current = [...rest, front];
        });
    };

    const reverseSwap = () => {
        if (order.current.length < 2) return;

        const last = order.current[order.current.length - 1];
        const rest = order.current.slice(0, order.current.length - 1);
        const elLast = refs[last].current;
        if (!elLast) return;

        const tl = gsap.timeline();
        tlRef.current = tl;

        const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);

        // Set zIndex to front immediately
        tl.set(elLast, { zIndex: frontSlot.zIndex });

        // Animate others back
        rest.forEach((idx, i) => {
            const el = refs[idx].current;
            if (!el) return;
            const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
            tl.to(el, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                zIndex: slot.zIndex,
                duration: config.durMove,
                ease: config.ease
            }, 0);
        });

        // Animate Last to Front (simulate coming up from bottom)
        tl.fromTo(elLast,
            {
                x: frontSlot.x,
                y: frontSlot.y + 500,
                z: frontSlot.z
            },
            {
                x: frontSlot.x,
                y: frontSlot.y,
                z: frontSlot.z,
                duration: config.durReturn,
                ease: config.ease
            }, 0
        );

        tl.call(() => {
            order.current = [last, ...rest];
        });
    };

    const jumpTo = (index: number) => {
        const currentPos = order.current.indexOf(index);
        if (currentPos === -1 || currentPos === 0) return;

        const A = order.current.slice(0, currentPos);
        const B = order.current.slice(currentPos);
        const newOrder = [...B, ...A];

        order.current = newOrder;

        const total = refs.length;
        newOrder.forEach((idx, i) => {
            const el = refs[idx].current;
            if (el) {
                const slot = makeSlot(i, cardDistance, verticalDistance, total);
                gsap.set(el, {
                    x: slot.x,
                    y: slot.y,
                    z: slot.z,
                    zIndex: slot.zIndex,
                    xPercent: -50,
                    yPercent: -50,
                    skewY: skewAmount,
                    transformOrigin: 'center center',
                    force3D: true
                });
            }
        });
    };

    useImperativeHandle(ref, () => ({
        swap,
        reverseSwap,
        jumpTo
    }));

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) => {
            if (r.current) placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
        });

        // intervalRef.current = window.setInterval(swap, delay);

        if (pauseOnHover) {
            const node = container.current;
            if (!node) return;
            const pause = () => {
                tlRef.current?.pause();
                clearInterval(intervalRef.current);
            };
            const resume = () => {
                tlRef.current?.play();
                // intervalRef.current = window.setInterval(swap, delay);
            };
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
            return () => {
                node.removeEventListener('mouseenter', pause);
                node.removeEventListener('mouseleave', resume);
                clearInterval(intervalRef.current);
            };
        }
        return () => clearInterval(intervalRef.current);
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs, config]);

    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child as React.ReactElement<any>, {
                key: i,
                ref: refs[i],
                style: { width, height, ...((child.props as any).style ?? {}) },
                onClick: (e: React.MouseEvent) => {
                    (child.props as any).onClick?.(e);
                    onCardClick?.(i);
                }
            })
            : child
    );

    return (
        <div ref={container} className="card-swap-container" style={{ width, height }}>
            {rendered}
        </div>
    );
});

export default CardSwap;
