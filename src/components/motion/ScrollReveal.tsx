import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'motion/react';
import { motionDuration, motionEase } from '../../motion/motionConfig';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialY = direction === 'up' ? distance : direction === 'down' ? -distance : 0;
  const initialX = direction === 'left' ? distance : direction === 'right' ? -distance : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: motionDuration.medium,
        delay,
        ease: motionEase.editorial,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SectionHeaderReveal: React.FC<{
  label?: string;
  number?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}> = ({ label, number, title, subtitle, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 35%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {label && (
          <div className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] mb-2">
            {number && <span className="mr-2">{number}.</span>}
            {label}
          </div>
        )}
        <h2 className="font-serif italic text-3xl sm:text-5xl text-white mb-3">{title}</h2>
        {subtitle && <p className="font-sans text-sm text-[#C9C7C1]">{subtitle}</p>}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={className}>
      {label && (
        <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] mb-2 block flex items-center gap-2">
          {number && <span className="font-semibold">{number}.</span>}
          <span>{label}</span>
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-sm sm:text-base text-[#C9C7C1] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export const ImageScrollReveal: React.FC<{
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  parallaxStrength?: number;
}> = ({
  src,
  alt = 'Editorial photography',
  className = '',
  aspectRatio = 'aspect-[16/9]',
  parallaxStrength = 8,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallaxStrength}%`, `-${parallaxStrength}%`]
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.03]);

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden rounded-2xl border border-[#28282D] ${aspectRatio} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#28282D]/80 bg-[#121214] ${aspectRatio} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        style={{ y: imageY, scale: imageScale }}
        className="w-full h-[115%] -top-[7.5%] relative object-cover object-center will-change-transform"
      />
    </div>
  );
};

export const TextScrollReveal: React.FC<{
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  delay?: number;
  stagger?: number;
}> = ({ text, className = '', as = 'div', delay = 0, stagger = 0.03 }) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const CustomComponent = as;
    return <CustomComponent className={className}>{text}</CustomComponent>;
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: motionEase.editorial,
      },
    },
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          variants={wordVariants}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
