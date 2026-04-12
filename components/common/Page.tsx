"use client";

import * as React from "react";
import { mergeProps, useRender } from "@base-ui/react";

import { cn } from "@/lib/utils";

const sizeClassMap = {
  sm: "py-2 md:py-4",
  md: "py-4 md:py-6 lg:py-8",
  lg: "py-6 md:py-8 lg:py-12",
  xl: "py-8 md:py-12 lg:py-14 xl:py-16",
};

type SectionSize = keyof typeof sizeClassMap;

export type SectionProps<T extends React.ElementType> = {
  render?: React.ReactElement | ((props: React.ComponentPropsWithRef<T>) => React.ReactElement);
} & React.ComponentPropsWithRef<T> & {
    sectionSize?: SectionSize;
  };

export function Section<T extends React.ElementType = "section">(props: SectionProps<T>) {
  const { render, sectionSize = "md", ...otherProps } = props;

  return useRender({
    defaultTagName: "section",
    render,
    props: mergeProps(otherProps, {
      // TS loses the literal union type for `sectionSize` due to generic prop merging,
      // so we assert it here to safely index into `sizeClassMap`.
      className: cn(
        `px-2 md:px-4 lg:px-6 xl:min-h-[calc(100vh-68px)] xl:px-8 ${sizeClassMap[sectionSize as SectionSize]}`,
      ),
    }),
  });
}
