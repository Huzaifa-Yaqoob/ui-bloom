import { Slot } from '@radix-ui/react-slot';
import { ReactNode, ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function H1({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'h1'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'h1';
  return (
    <Comp
      className={cn(
        'scroll-m-20 text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function H2({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'h2'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'h2';
  return (
    <Comp
      className={cn(
        'scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function H3({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'h3'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'h3';
  return (
    <Comp
      className={cn(
        'scroll-m-20 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function H4({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'h4'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'h4';
  return (
    <Comp
      className={cn(
        'scroll-m-20 text-base sm:text-lg md:text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function H5({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'h5'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'h5';
  return (
    <Comp
      className={cn(
        'scroll-m-20 text-base sm:text-lg md:text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function H6({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'h6'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'h6';
  return (
    <Comp
      className={cn(
        'scroll-m-20 text-base sm:text-lg md:text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function P({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'p'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      className={cn(
        'leading-6 md:leading-7 text-sm sm:text-base [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function BlockQoute({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'blockquote'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'blockquote';
  return (
    <Comp
      className={cn(
        'mt-4 sm:mt-6 border-l-2 pl-4 sm:pl-6 text-sm sm:text-base italic',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Code({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'code'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'code';
  return (
    <Comp
      className={cn(
        'bg-muted relative rounded px-[0.2rem] sm:px-[0.3rem] py-[0.15rem] sm:py-[0.2rem] font-mono text-xs sm:text-sm font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Lead({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'span'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn(
        'text-muted-foreground text-lg sm:text-xl md:text-2xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Large({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'span'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn('text-base sm:text-lg md:text-xl font-semibold', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Small({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'span'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn('text-xs sm:text-sm leading-none font-medium', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Muted({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'span'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn('text-muted-foreground text-xs sm:text-sm', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Title({
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'div'> & {
  asChild?: boolean;
  children: ReactNode;
}) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={cn(
        'text-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
