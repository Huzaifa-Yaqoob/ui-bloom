"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  memo,
} from "react";
import {
  useDropzone,
  DropzoneState,
  DropzoneOptions,
  FileRejection,
  DropEvent,
} from "react-dropzone";
import { X, Loader2, Maximize, File, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

export const DropzoneContext = createContext<{
  dropzoneProps: DropzoneState;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
  categorizedFiles: {
    images?: File[];
    pdfs?: File[];
    audioFiles?: File[];
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
  value,
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

  useEffect(() => {
    if (!value) {
      setFiles([]);
    }
  }, [value]);

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
  const files = useDropzoneContext().files;
  const { images, pdfs, audioFiles, videoFiles, others } =
    useDropzoneContext().categorizedFiles;
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {files && files?.length > 0 && (
          <FileCount fileType="All" count={files.length} />
        )}
        {images && images?.length > 0 && (
          <FileCount fileType="Images" count={images.length} />
        )}
        {videoFiles && videoFiles?.length > 0 && (
          <FileCount fileType="Videos" count={videoFiles.length} />
        )}
        {audioFiles && audioFiles?.length > 0 && (
          <FileCount fileType="Audios" count={audioFiles.length} />
        )}
        {pdfs && pdfs?.length > 0 && (
          <FileCount fileType="PDFs" count={pdfs.length} />
        )}
        {others && others?.length > 0 && (
          <FileCount fileType="Others" count={others.length} />
        )}
      </div>
      <PreviewWrapper>
        <AllPreviewAll files={files} />
      </PreviewWrapper>
    </div>
  );
}

function AllPreviewAll({ files }: { files: File[] | undefined }) {
  return (
    <>
      {files && files.length > 0
        ? files.map((file, index) => (
            <PreviewAllItem key={index + file.name} file={file} />
          ))
        : "All selected files will be shown here."}
    </>
  );
}

function PreviewAllItem({ file }: { file: File }) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (type.startsWith("image/")) {
    return <ImagesPreviewItem image={file} />;
  } else if (type === "application/pdf" || name.endsWith(".pdf")) {
    return <PDFPreviewItem pdf={file} />;
  } else if (
    type.startsWith("audio/") ||
    name.endsWith(".mp3") ||
    name.endsWith(".wav") ||
    name.endsWith(".ogg")
  ) {
    return <AudioPreviewItem audio={file} />;
  } else if (
    type.startsWith("video/") ||
    name.endsWith(".mp4") ||
    name.endsWith(".mov") ||
    name.endsWith(".avi")
  ) {
    return <VideoPreviewItem video={file} />;
  } else {
    return <OtherFilePreviewItem other={file} />;
  }
}

// For Images Preview
function ImagesPreview() {
  const { images } = useDropzoneContext().categorizedFiles;
  return (
    <div>
      {images && images?.length > 0 && (
        <FileCount fileType="Images" count={images.length} />
      )}
      <PreviewWrapper>
        <AllImages images={images} />
      </PreviewWrapper>
    </div>
  );
}

function AllImages({ images }: { images: File[] | undefined }) {
  return (
    <>
      {images && images.length > 0
        ? images.map((image, index) => (
            <ImagesPreviewItem key={index + image.name} image={image} />
          ))
        : "All selected images will be shown here."}
    </>
  );
}

function ImagesPreviewItem({ image }: { image: File }) {
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {preview && (
        <div className="bg-muted p-1 rounded group">
          <div className="relative w-36 h-24 rounded overflow-hidden shadow bg-muted">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="animate-spin text-white" />
              </div>
            )}
            <img
              src={preview}
              alt={image.name}
              className="object-cover w-full h-full"
              onLoad={handleImageLoad}
            />
            <RemoveFileButton file={image} />
            <OpenImageDialog image={image} />
          </div>
          <div className="text-xs text-center">
            {formatFileName(image.name)}
          </div>
        </div>
      )}
    </>
  );
}

function OpenImageDialog({ image }: { image: File }) {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageURL(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Dialog>
      <OpenDialogButton />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{image.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {isLoading && <Loader2 className="animate-spin" />}
          {imageURL && (
            <img
              ref={imageRef}
              src={imageURL}
              onLoad={handleLoad}
              className="w-auto max-h-96 rounded-lg"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// For video FIles
function VideosPreview() {
  const { videoFiles } = useDropzoneContext().categorizedFiles;
  return (
    <div>
      {videoFiles && videoFiles?.length > 0 && (
        <FileCount fileType="Videos" count={videoFiles.length} />
      )}
      <PreviewWrapper>
        <AllVideos videos={videoFiles} />
      </PreviewWrapper>
    </div>
  );
}

function AllVideos({ videos }: { videos: File[] | undefined }) {
  return (
    <>
      {videos && videos.length > 0
        ? videos.map((video, index) => (
            <VideoPreviewItem key={index + video.name} video={video} />
          ))
        : "All selected videos will be shown here."}
    </>
  );
}

const VideoPreviewItem = memo(({ video }: { video: File }) => {
  const [preview, setPreview] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(video);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [video]);

  useEffect(() => {
    const captureFrame = async () => {
      const videoEl = videoRef.current;
      const canvasEl = canvasRef.current;
      if (!videoEl || !canvasEl) return;

      const duration = videoEl.duration;
      if (duration < 1) {
        await captureFrameAtTime(0);
      } else {
        const randomTime = Math.random() * (duration - 0.5);
        await captureFrameAtTime(randomTime);
      }
    };

    const captureFrameAtTime = (time: number) => {
      return new Promise<void>((resolve) => {
        const videoEl = videoRef.current;
        const canvasEl = canvasRef.current;
        if (!videoEl || !canvasEl) return resolve();

        videoEl.currentTime = time;

        videoEl.onseeked = () => {
          const ctx = canvasEl.getContext("2d");
          if (!ctx) return resolve();

          canvasEl.width = videoEl.videoWidth;
          canvasEl.height = videoEl.videoHeight;

          ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);

          const imgDataUrl = canvasEl.toDataURL("image/png");
          setThumbnail(imgDataUrl);
          resolve();
        };
      });
    };

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.onloadedmetadata = () => {
        captureFrame();
      };
      videoEl.load();
    }
  }, [preview]);

  return (
    <>
      {preview && (
        <div className="bg-muted p-1 rounded group">
          <div className="relative w-36 h-24 rounded overflow-hidden shadow bg-muted">
            <video
              ref={videoRef}
              src={preview}
              className="hidden"
              crossOrigin="anonymous"
            />
            <canvas ref={canvasRef} className="hidden" />

            {thumbnail ? (
              <img
                src={
                  thumbnail ||
                  "https://unsplash.com/photos/clapboard-camera-and-copy-space-on-white-background-1878GCQTo08"
                }
                alt="Video thumbnail"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs">
                <Loader2 className="animate-spin" />
              </div>
            )}

            <RemoveFileButton file={video} />
            <PlayVideoDialog video={video} />
          </div>
          <div className="text-xs text-center block mt-1">
            {formatFileName(video.name)}
          </div>
        </div>
      )}
    </>
  );
});

function PlayVideoDialog({ video }: { video: File }) {
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(video);
    setVideoURL(url);

    return () => URL.revokeObjectURL(url);
  }, [video]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <Dialog>
      <OpenDialogButton />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{video.name}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video">
          {isLoading && <Loader2 className="animate-spin" />}
          {videoURL && (
            <video
              ref={videoRef}
              controls
              src={videoURL}
              autoPlay
              muted
              onCanPlay={handleCanPlay}
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// For Music Files
function AudiosPreview() {
  const { audioFiles } = useDropzoneContext().categorizedFiles;
  return (
    <div>
      {audioFiles && audioFiles?.length > 0 && (
        <FileCount fileType="Audios" count={audioFiles.length} />
      )}
      <PreviewWrapper>
        <AllAudios audios={audioFiles} />
      </PreviewWrapper>
    </div>
  );
}

function AllAudios({ audios }: { audios: File[] | undefined }) {
  return (
    <>
      {audios && audios.length > 0
        ? audios.map((audio, index) => (
            <AudioPreviewItem key={index + audio.name} audio={audio} />
          ))
        : "All selected audios will be shown here."}
    </>
  );
}

function AudioPreviewItem({ audio }: { audio: File }) {
  return (
    <div className="bg-muted p-1 rounded group">
      <div className=" relative w-36 h-24 rounded shadow flex items-center justify-center bg-green-200 text-green-600">
        <Music size={64} />
        <RemoveFileButton file={audio} />
        <PlayAudioDialog audio={audio} />
      </div>
      <div className="text-xs text-center">{formatFileName(audio.name)}</div>
    </div>
  );
}

function PlayAudioDialog({ audio }: { audio: File }) {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(audio);
    setAudioURL(url);
  }, [audio]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <Dialog>
      <OpenDialogButton />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{audio.name}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video flex flex-col items-center justify-center gap-4">
          {isLoading && <Loader2 className="animate-spin" />}
          {audioURL && (
            <audio
              ref={audioRef}
              controls
              src={audioURL}
              autoPlay
              onCanPlay={handleCanPlay}
              className="w-full rounded-lg bg-primary-foreground p-4"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// For PDF Files
function PDFsPreview() {
  const { pdfs } = useDropzoneContext().categorizedFiles;
  return (
    <div>
      {pdfs && pdfs?.length > 0 && (
        <FileCount fileType="PDFs" count={pdfs.length} />
      )}
      <PreviewWrapper>
        <AllPDFs pdfs={pdfs} />
      </PreviewWrapper>
    </div>
  );
}

function AllPDFs({ pdfs }: { pdfs: File[] | undefined }) {
  return (
    <>
      {pdfs && pdfs.length > 0
        ? pdfs.map((pdf, index) => (
            <PDFPreviewItem key={index + pdf.name} pdf={pdf} />
          ))
        : "All selected pdfs will be shown here."}
    </>
  );
}

function PDFPreviewItem({ pdf }: { pdf: File }) {
  return (
    <div className="bg-muted p-1 rounded group">
      <div className="relative w-36 h-24 rounded overflow-hidden shadow bg-muted">
        <FormatFileIcon
          fileType="PDF"
          className="bg-red-200 text-red-600"
          extClassName="bg-red-200"
        />
        <RemoveFileButton file={pdf} />
      </div>
      <div className="text-xs text-center">{formatFileName(pdf.name)}</div>
    </div>
  );
}

// For Excel Files
function OtherFilesPreview() {
  const { others } = useDropzoneContext().categorizedFiles;
  return (
    <div>
      {others && others?.length > 0 && (
        <FileCount fileType="Excel Files" count={others.length} />
      )}
      <PreviewWrapper>
        <AllOthersFiles others={others} />
      </PreviewWrapper>
    </div>
  );
}

function AllOthersFiles({ others }: { others: File[] | undefined }) {
  return (
    <>
      {others && others.length > 0
        ? others.map((other, index) => (
            <OtherFilePreviewItem key={index + other.name} other={other} />
          ))
        : "All other files will be shown here."}
    </>
  );
}

function OtherFilePreviewItem({ other }: { other: File }) {
  return (
    <div className="bg-muted p-1 rounded group">
      <div className="relative w-36 h-24 rounded overflow-hidden shadow bg-muted">
        <FormatFileIcon
          fileType={other.name.split(".").pop()?.toUpperCase() || "N/A"}
          className="bg-accent-foreground text-accent"
        />
        <RemoveFileButton file={other} />
      </div>
      <div className="text-xs text-center">{formatFileName(other.name)}</div>
    </div>
  );
}

function FileCount({ fileType, count }: { fileType: string; count: number }) {
  return (
    <p className="mb-4">
      {fileType}: <b>{count}</b>
    </p>
  );
}

function OpenDialogButton() {
  return (
    <DialogTrigger className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full p-1 text-xs cursor-pointer shadow-lg opacity-0 group-hover:opacity-75 transition-opacity duration-100">
      <Maximize size={18} />
    </DialogTrigger>
  );
}

function RemoveFileButton({ file }: { file: File }) {
  const { removeFile } = useDropzoneContext();
  return (
    <button
      type="button"
      onClick={() => removeFile(file)}
      className="absolute top-1 right-1 bg-destructive rounded-full p-1 text-xs cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-foreground"
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

function FormatFileIcon({
  fileType,
  className = "",
  extClassName = "",
}: {
  fileType: string;
  className?: string;
  extClassName?: string;
}) {
  return (
    <div className={cn("h-full flex items-center justify-center", className)}>
      <File size={64} />
      <div
        className={cn(
          "absolute font-bold bg-accent-foreground px-1 rounded shadow-2xl",
          extClassName
        )}
      >
        {fileType}
      </div>
    </div>
  );
}

function formatFileName(filename: string) {
  const parts = filename.split(".");
  const extension = parts.pop();
  const baseName = parts.join(".");

  let formattedName;
  if (baseName.length > 11) {
    formattedName = baseName.slice(0, 8) + "..." + baseName.slice(8, 11);
  } else {
    formattedName = baseName;
  }

  return `${formattedName}.${extension}` || "loading...";
}

function categorizedFiles(files: File[]) {
  const images: File[] = [];
  const pdfs: File[] = [];
  const audioFiles: File[] = [];
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
      type.startsWith("audio/") ||
      name.endsWith(".mp3") ||
      name.endsWith(".wav") ||
      name.endsWith(".ogg")
    ) {
      audioFiles.push(file);
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
    audioFiles,
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
  VideosPreview,
  PDFsPreview,
  AudiosPreview,
  OtherFilesPreview,
};
