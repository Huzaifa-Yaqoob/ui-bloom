import { Slot } from '@radix-ui/react-slot';
import { ReactNode, ComponentProps, memo } from 'react';
import { cn } from '@/lib/utils';

function H1Component({
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
        'scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance sm:text-3xl md:text-4xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function H2Component({
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
        'scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function H3Component({
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
        'scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function H4Component({
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
        'scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function H5Component({
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
        'scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function H6Component({
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
        'scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-xl',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function PComponent({
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
        'text-sm leading-6 sm:text-base md:leading-7 [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function BlockQuoteComponent({
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
        'mt-4 border-l-2 pl-4 text-sm italic sm:mt-6 sm:pl-6 sm:text-base',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function CodeComponent({
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
        'bg-muted relative rounded px-[0.2rem] py-[0.15rem] font-mono text-xs font-semibold sm:px-[0.3rem] sm:py-[0.2rem] sm:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function LeadComponent({
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

function LargeComponent({
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
      className={cn('text-base font-semibold sm:text-lg md:text-xl', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

function SmallComponent({
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
      className={cn('text-xs leading-none font-medium sm:text-sm', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

function MutedComponent({
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

function TitleComponent({
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

const H1 = memo(H1Component);
const H2 = memo(H2Component);
const H3 = memo(H3Component);
const H4 = memo(H4Component);
const H5 = memo(H5Component);
const H6 = memo(H6Component);
const P = memo(PComponent);
const BlockQuote = memo(BlockQuoteComponent);
const Code = memo(CodeComponent);
const Lead = memo(LeadComponent);
const Large = memo(LargeComponent);
const Small = memo(SmallComponent);
const Muted = memo(MutedComponent);
const Title = memo(TitleComponent);

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  BlockQuote,
  Code,
  Lead,
  Large,
  Small,
  Muted,
  Title,
};
