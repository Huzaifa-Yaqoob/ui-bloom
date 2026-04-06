"use client";

import * as React from "react";
import { mergeProps, useRender } from "@base-ui/react";

import { cn } from "@/lib/utils";

// Golden ratio: 1.618
// Base size: 1rem (16px)
// Scale: base * (1.618 ^ n)

const typographyStyles = {
  h1: "text-[4.236rem] font-bold leading-tight tracking-tight", // 1.618^3
  h2: "text-[2.618rem] font-bold leading-tight tracking-tight", // 1.618^2
  h3: "text-[1.618rem] font-semibold leading-snug tracking-normal", // 1.618^1
  h4: "text-[1.272rem] font-semibold leading-snug tracking-normal", // 1.618^0.5
  h5: "text-[1.127rem] font-medium leading-normal tracking-normal", // 1.618^0.25
  h6: "text-[1rem] font-medium leading-normal tracking-normal", // 1.618^0
  p: "text-[1rem] font-normal leading-relaxed tracking-normal",
  blockquote:
    "text-[1.127rem] font-normal leading-relaxed tracking-normal border-l-4 border-border pl-4 italic",
  span: "text-[1rem] font-normal leading-normal tracking-normal",
  small: "text-[0.786rem] font-normal leading-normal tracking-normal", // 1 / 1.272
  strong: "font-semibold",
  em: "italic",
  code: "text-[0.875rem] font-mono bg-muted px-1.5 py-0.5 rounded-sm",
  pre: "text-[0.875rem] font-mono bg-muted p-4 rounded-lg overflow-x-auto",
  ul: "text-[1rem] font-normal leading-relaxed list-disc list-inside space-y-2",
  ol: "text-[1rem] font-normal leading-relaxed list-decimal list-inside space-y-2",
  li: "text-[1rem] font-normal leading-relaxed",
} as const;

type TypographyTag = keyof typeof typographyStyles;

export type TypographyProps<T extends React.ElementType> = {
  render?: React.ReactElement | ((props: React.ComponentPropsWithRef<T>) => React.ReactElement);
} & React.ComponentPropsWithRef<T> & {
    variant?: TypographyTag;
  };

export function Typography<T extends React.ElementType = "p">(props: TypographyProps<T>) {
  const { render, variant, className, ...otherProps } = props;

  // Determine the tag being rendered
  const getDefaultTag = (): TypographyTag => {
    if (variant) return variant;
    if (render) {
      if (React.isValidElement(render)) {
        return render.type as TypographyTag;
      }
    }
    return "p";
  };

  const defaultTag = getDefaultTag();
  const styles = typographyStyles[defaultTag] || typographyStyles.p;

  return useRender({
    defaultTagName: defaultTag,
    render,
    props: mergeProps(otherProps, {
      className: cn(styles, className),
    }),
  });
}

// Convenience components for common use cases
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps<"h1">, "variant">>(
  (props, ref) => <Typography<"h1"> {...props} render={<h1 ref={ref} />} variant="h1" />,
);
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps<"h2">, "variant">>(
  (props, ref) => <Typography<"h2"> {...props} render={<h2 ref={ref} />} variant="h2" />,
);
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps<"h3">, "variant">>(
  (props, ref) => <Typography<"h3"> {...props} render={<h3 ref={ref} />} variant="h3" />,
);
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps<"h4">, "variant">>(
  (props, ref) => <Typography<"h4"> {...props} render={<h4 ref={ref} />} variant="h4" />,
);
H4.displayName = "H4";

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps<"h5">, "variant">>(
  (props, ref) => <Typography<"h5"> {...props} render={<h5 ref={ref} />} variant="h5" />,
);
H5.displayName = "H5";

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps<"h6">, "variant">>(
  (props, ref) => <Typography<"h6"> {...props} render={<h6 ref={ref} />} variant="h6" />,
);
H6.displayName = "H6";

export const P = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps<"p">, "variant">>(
  (props, ref) => <Typography<"p"> {...props} render={<p ref={ref} />} variant="p" />,
);
P.displayName = "P";

export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  Omit<TypographyProps<"blockquote">, "variant">
>((props, ref) => (
  <Typography<"blockquote"> {...props} render={<blockquote ref={ref} />} variant="blockquote" />
));
Blockquote.displayName = "Blockquote";

export const Small = React.forwardRef<HTMLElement, Omit<TypographyProps<"small">, "variant">>(
  (props, ref) => <Typography<"small"> {...props} render={<small ref={ref} />} variant="small" />,
);
Small.displayName = "Small";

export const Code = React.forwardRef<HTMLElement, Omit<TypographyProps<"code">, "variant">>(
  (props, ref) => <Typography<"code"> {...props} render={<code ref={ref} />} variant="code" />,
);
Code.displayName = "Code";

export const Lead = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps<"p">, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography<"p">
      {...props}
      render={<p ref={ref} />}
      variant="p"
      className={cn("text-[1.272rem] text-muted-foreground", className)}
    />
  ),
);
Lead.displayName = "Lead";

export const Muted = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps<"p">, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography<"p">
      {...props}
      render={<p ref={ref} />}
      variant="p"
      className={cn("text-muted-foreground", className)}
    />
  ),
);
Muted.displayName = "Muted";
