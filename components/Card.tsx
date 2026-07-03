// components/Card.tsx
import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, hover = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'rounded-2xl border border-gray-800 p-6',
        glass && 'bg-gray-900/50 backdrop-blur-xl',
        !glass && 'bg-gray-900',
        hover && 'hover:border-gray-700 hover:shadow-neon-blue transition-all duration-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';
