'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import TextBorderAnimation from '@/shared/components/animata/text/text-border-animation';

interface AppLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
}

const AppLink: React.FC<React.PropsWithChildren<AppLinkProps>> = ({
  href,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const isString = typeof children === 'string';

  return (
    <Link
      href={href}
      {...props}
      onClick={onClick}
      className={cn(
        'text-inherit transition-colors duration-300 hover:text-primary',
        className
      )}
    >
      {isString ? <TextBorderAnimation text={children} className={className} /> : children}
    </Link>
  );
};

export default React.memo(AppLink);
