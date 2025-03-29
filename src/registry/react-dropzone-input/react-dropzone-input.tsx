"use client";

import React, { createContext, useContext } from "react";
import { useDropzone, DropzoneState, DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils";

export const DropzoneContext = createContext<DropzoneState | null>(null);

function useDropzoneContext() {
  const context = useContext(DropzoneContext);
  if (!context) {
    throw new Error("DropArea must be used within DropzoneWrapper.");
  }
  return context;
}

function DropzoneProvider({
  options = {},
  children,
}: {
  children: React.ReactNode;
  options?: DropzoneOptions;
}) {
  const dropzoneProps = useDropzone(options);

  return (
    <DropzoneContext.Provider value={dropzoneProps}>
      {children}
    </DropzoneContext.Provider>
  );
}

function DropArea({
  unstyled = false,
  renderer,
}: {
  unstyled?: boolean;
  renderer: (
    props: Omit<DropzoneState, "getRootProps" | "getInputProps">
  ) => React.ReactNode;
}) {
  const { getRootProps, getInputProps, ...props } = useDropzoneContext();

  return (
    <div {...getRootProps()} className={unstyled ? "" : "bg-muted p-2"}>
      <input {...getInputProps()} />
      {renderer(props)}
    </div>
  );
}

function PreviewArea() {
  const { acceptedFiles } = useDropzoneContext();
  return <></>;
}

export { useDropzoneContext, DropzoneProvider, DropArea, PreviewArea };
