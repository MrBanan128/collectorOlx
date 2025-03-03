/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'letters', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
  fontSize // Added fontSize prop
}) => {
  const elements = animateBy === 'letters' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  const defaultFrom =
    direction === 'top'
      ? {
          filter: 'blur(10px)',
          //  borderImage="linear-gradient(45deg, #b88b4a, #ffd700, #b8860b, #fcf3ce, #b88b4a)"
          opacity: 0,
          transform: 'translate3d(0,-50px,0)'
        }
      : {
          filter: 'blur(10px)',
          opacity: 0,
          transform: 'translate3d(0,50px,0)'
        };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform:
        direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)'
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
            for (const step of animationTo || defaultTo) {
              await next(step);
            }
            animatedCount.current += 1;
            if (
              animatedCount.current === elements.length &&
              onAnimationComplete
            ) {
              onAnimationComplete();
            }
          }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing }
    }))
  );

  return (
    <p ref={ref} className={`blur-text ${className}`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
            fontSize: fontSize || 'inherit', // Apply the fontSize prop or fallback to 'inherit'
            backgroundImage:
              'linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)',
            backgroundClip: 'text', // Apply background gradient to text
            WebkitBackgroundClip: 'text', // For webkit-based browsers like Chrome and Safari
            color: 'transparent' // Make text transparent so background is visible
          }}
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
};

export default BlurText;
