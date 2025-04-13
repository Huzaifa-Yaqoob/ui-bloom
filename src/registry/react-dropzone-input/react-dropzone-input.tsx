"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  useDropzone,
  DropzoneState,
  DropzoneOptions,
  FileRejection,
  DropEvent,
} from "react-dropzone";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const DropzoneContext = createContext<{
  dropzoneProps: DropzoneState;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
  categorizedFiles: {
    images?: File[];
    pdfs?: File[];
    wordDocs?: File[];
    excelFiles?: File[];
    musicFiles?: File[];
    videoFiles?: File[];
    others?: File[];
  };
  removeFile: (fileToRemove: File) => void;
} | null>(null);

interface DropZoneProviderProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  onBlur?: () => void;
  children: React.ReactNode;
  options?: DropzoneOptions;
}

interface DropAreaProps {
  unstyled?: boolean;
  renderer: (
    props: Omit<DropzoneState, "getRootProps" | "getInputProps">
  ) => React.ReactNode;
}

function useDropzoneContext() {
  const context = useContext(DropzoneContext);
  if (!context) {
    throw new Error("DropArea must be used within DropzoneWrapper.");
  }
  return context;
}

function DropzoneProvider({
  options = {},
  onChange,
  children,
}: DropZoneProviderProps) {
  const { onDrop, multiple, ...restProps } = options;
  const [files, setFiles] = useState<File[]>([]);

  const onDropC = useCallback((acceptedFiles: File[]) => {
    let newFiles: File[] = [];
    if (multiple) {
      newFiles = [...files, ...acceptedFiles];
    } else {
      newFiles = acceptedFiles[0] ? [acceptedFiles[0]] : [];
    }
    onChange && onChange(newFiles);
    setFiles(newFiles);
  }, []);

  const removeFile = (fileToRemove: File) => {
    let newFiles: File[] = files.filter((file) => file !== fileToRemove);
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const dropzoneProps = useDropzone({
    onDrop: (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      onDropC(acceptedFiles);
      onDrop && onDrop(acceptedFiles, fileRejections, event);
    },
    multiple,
    ...restProps,
  });

  const categorized = useMemo(() => categorizedFiles(files), [files]);

  return (
    <DropzoneContext.Provider
      value={{
        dropzoneProps,
        files,
        categorizedFiles: categorized,
        setFiles,
        removeFile,
      }}
    >
      {children}
    </DropzoneContext.Provider>
  );
}

function DropArea({ unstyled = false, renderer }: DropAreaProps) {
  const { getRootProps, getInputProps, ...props } =
    useDropzoneContext().dropzoneProps;

  const files = useDropzoneContext().files;

  return (
    <div {...getRootProps()} className={unstyled ? "" : "bg-muted p-2"}>
      <input {...getInputProps()} />
      {renderer(props)}
    </div>
  );
}

function PreviewAll() {
  const { images } = useDropzoneContext().categorizedFiles;

  return <></>;
}

// For Images Preview
function ImagesPreview() {
  const { images } = useDropzoneContext().categorizedFiles;
  return (
    <PreviewWrapper>
      {images && images.length > 0
        ? images.map((image, index) => (
            <ImagesPreviewItem key={index + image.name} image={image} />
          ))
        : "No image is selected."}
    </PreviewWrapper>
  );
}

function ImagesPreviewItem({ image }: { image: File }) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  return (
    <>
      {preview && (
        <div className="bg-muted p-1 rounded">
          <div className="relative w-32 h-32 rounded overflow-hidden shadow bg-muted">
            <img
              src={preview}
              alt={image.name}
              className="object-cover w-full h-full"
            />
            <RemoveFileButton file={image} />
          </div>
          <span className="text-xs text-center">
            {formatFileName(image.name)}
          </span>
        </div>
      )}
    </>
  );
}

function RemoveFileButton({ file }: { file: File }) {
  const { removeFile } = useDropzoneContext();
  return (
    <button
      type="button"
      onClick={() => removeFile(file)}
      className="absolute top-1 right-1 bg-destructive rounded-full p-1 text-xs cursor-pointer"
    >
      <X size={16} />
    </button>
  );
}

function PreviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 max-h-64 flex-wrap overflow-y-scroll justify-center">
      {children}
    </div>
  );
}

function formatFileName(filename: string) {
  const parts = filename.split(".");
  const extension = parts.pop(); // get extension
  const baseName = parts.join("."); // supports filenames like "file.name.txt"

  let formattedName;
  if (baseName.length > 11) {
    formattedName = baseName.slice(0, 8) + "..." + baseName.slice(8, 11); // first 8 + next 3
  } else {
    formattedName = baseName;
  }

  return `${formattedName}.${extension}`;
}

function categorizedFiles(files: File[]) {
  const images: File[] = [];
  const pdfs: File[] = [];
  const wordDocs: File[] = [];
  const excelFiles: File[] = [];
  const musicFiles: File[] = [];
  const videoFiles: File[] = [];
  const others: File[] = [];

  files.forEach((file) => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (type.startsWith("image/")) {
      images.push(file);
    } else if (type === "application/pdf" || name.endsWith(".pdf")) {
      pdfs.push(file);
    } else if (
      name.endsWith(".doc") ||
      name.endsWith(".docx") ||
      type === "application/msword" ||
      type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      wordDocs.push(file);
    } else if (
      name.endsWith(".xls") ||
      name.endsWith(".xlsx") ||
      type === "application/vnd.ms-excel" ||
      type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      excelFiles.push(file);
    } else if (
      type.startsWith("audio/") ||
      name.endsWith(".mp3") ||
      name.endsWith(".wav") ||
      name.endsWith(".ogg")
    ) {
      musicFiles.push(file);
    } else if (
      type.startsWith("video/") ||
      name.endsWith(".mp4") ||
      name.endsWith(".mov") ||
      name.endsWith(".avi")
    ) {
      videoFiles.push(file);
    } else {
      others.push(file);
    }
  });

  return {
    images,
    pdfs,
    wordDocs,
    excelFiles,
    musicFiles,
    videoFiles,
    others,
  };
}

export {
  useDropzoneContext,
  DropzoneProvider,
  DropArea,
  PreviewAll,
  ImagesPreview,
};
