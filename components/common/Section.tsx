"use client";

import * as React from "react";
import { mergeProps, useRender } from "@base-ui/react";

// T extends React.ElementType allows 'div', 'section', 'nav', etc.
export type SectionProps<T extends React.ElementType> = {
  render?: React.ReactElement | ((props: React.ComponentPropsWithRef<T>) => React.ReactElement);
} & React.ComponentPropsWithRef<T>;

export function Section<T extends React.ElementType = "section">(props: SectionProps<T>) {
  const { render, ...otherProps } = props;

  return useRender({
    defaultTagName: "section",
    render,
    props: mergeProps(otherProps, { className: "base-section" }),
  });
}
