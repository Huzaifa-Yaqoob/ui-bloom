"use client";

import React, { createContext, useContext } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
// import { FileText, FileMusic } from "lucide-react";
import { useDropzone, DropzoneState, DropzoneOptions } from "react-dropzone";
// import { cn } from "@/lib/utils";

export const DropzoneContext = createContext<{
  dropzoneProps: DropzoneState;
} | null>(null);

function useDropzoneContext() {
  const context = useContext(DropzoneContext);
  if (!context) {
    throw new Error("DropArea must be used within DropzoneWrapper.");
  }
  return context;
}

interface DropzoneProviderProps {
  children: React.ReactNode;
  options?: DropzoneOptions;
}

function DropzoneProvider({ options = {}, children }: DropzoneProviderProps) {
  const dropzoneProps = useDropzone(options);
  // const [acceptedFiles, setAcceptedFiles] = React.useState([]);

  return (
    <DropzoneContext.Provider value={{ dropzoneProps }}>
      {children}
    </DropzoneContext.Provider>
  );
}

interface DropAreaProps<T extends FieldValues, K extends FieldPath<T>> {
  unstyled: boolean;
  field: ControllerRenderProps<T, K>;
  name: K;
  renderer: (
    props: Omit<DropzoneState, "getRootProps" | "getInputProps" | "inputRef">
  ) => React.ReactNode;
}

function DropArea<T extends FieldValues, K extends FieldPath<T>>({
  unstyled = false,
  renderer,
  field,
}: DropAreaProps<T, K>) {
  const { getRootProps, getInputProps, inputRef, ...props } =
    useDropzoneContext().dropzoneProps;

  // React.useEffect(() => {}, []);

  return (
    <div {...getRootProps()} className={unstyled ? "" : "bg-muted p-2"}>
      <input
        {...getInputProps({
          onChange: (event) => {
            field.onChange(event.target.files);
          },
        })}
      />
      {renderer(props)}
    </div>
  );
}

function PreviewArea() {
  const { dropzoneProps } = useDropzoneContext();
  const { acceptedFiles } = dropzoneProps;

  return <>{acceptedFiles.length}</>;
}

// function ImagePreview({ file }: { file: File }) {}

export {
  useDropzoneContext,
  DropzoneProvider,
  DropArea,
  PreviewArea,
  // ImagePreview,
};
