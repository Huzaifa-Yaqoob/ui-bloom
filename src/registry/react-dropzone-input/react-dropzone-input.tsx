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

type CategorizedFiles = {
  images?: File[];
  pdfs?: File[];
  audioFiles?: File[];
  videoFiles?: File[];
  others?: File[];
};

type CategorizedPreviews = {
  images?: string[];
  pdfs?: string[];
  audioFiles?: string[];
  videoFiles?: string[];
  others?: string[];
};

export const DropzoneContext = createContext<{
  dropzoneProps: DropzoneState;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
  previews: string[];
  categorizedFiles: CategorizedFiles;
  categorizedPreviews: CategorizedPreviews;
  removeFile: (fileToRemove: File) => void;
  removePreview: (previewToRemove: string) => void;
} | null>(null);

type value = { files: File[]; previews: string[] };

interface DropZoneProviderProps {
  value?: value;
  onChange?: (value: value) => void;
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
  const [files, setFiles] = useState<File[]>(value?.files || []);
  const [previews, setPreviews] = useState<string[]>(value?.previews || []);

  const defaultValues = value;

  const onDropC = useCallback(
    (acceptedFiles: File[]) => {
      let newFiles: File[] = [];
      let newPreviews: string[] = previews;
      if (multiple) {
        newFiles = [...files, ...acceptedFiles];
      } else {
        newFiles = acceptedFiles[0] ? [acceptedFiles[0]] : [];
        newPreviews = [];
      }
      console.log(newPreviews, "newPreviews");
      onChange && onChange({ files: newFiles, previews: newPreviews });
    },
    [files]
  );

  const removeFile = (fileToRemove: File) => {
    let newFiles: File[] = files.filter((file) => file !== fileToRemove);
    onChange && onChange({ files: newFiles, previews: previews });
  };

  const removePreview = (previewToRemove: string) => {
    let newPreviews: string[] = previews.filter(
      (preview) => preview !== previewToRemove
    );
    onChange && onChange({ files: files, previews: newPreviews });
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

  const categorizedFiles = useMemo(() => categorizeFiles(files), [files]);

  const categorizedPreviews = useMemo(
    () => categorizePreviews(previews),
    [previews]
  );

  useEffect(() => {
    setFiles(defaultValues?.files || []);
    setPreviews(defaultValues?.previews || []);
  }, [value]);

  return (
    <DropzoneContext.Provider
      value={{
        dropzoneProps,
        files,
        categorizedFiles,
        setFiles,
        removeFile,
        removePreview,
        categorizedPreviews,
        previews,
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

function PreviewAll({ className = "" }: { className?: string }) {
  const files = useDropzoneContext().files;
  const previews = useDropzoneContext().previews;
  const { images, pdfs, audioFiles, videoFiles, others } =
    useDropzoneContext().categorizedFiles;
  const {
    images: pImages,
    pdfs: pPdfs,
    audioFiles: pAudioFiles,
    videoFiles: pVideoFiles,
    others: pOthers,
  } = useDropzoneContext().categorizedPreviews;
  return (
    <div className={className}>
      <div className="flex gap-2 flex-wrap">
        {(files?.length ?? 0) + (previews?.length ?? 0) > 0 && (
          <FileCount
            fileType="All"
            count={(files?.length ?? 0) + (previews?.length ?? 0)}
          />
        )}
        {(images?.length ?? 0) + (pImages?.length ?? 0) > 0 && (
          <FileCount
            fileType="Images"
            count={(images?.length ?? 0) + (pImages?.length ?? 0)}
          />
        )}
        {(videoFiles?.length ?? 0) + (pVideoFiles?.length ?? 0) > 0 && (
          <FileCount
            fileType="Videos"
            count={(videoFiles?.length ?? 0) + (pVideoFiles?.length ?? 0)}
          />
        )}
        {(audioFiles?.length ?? 0) + (pAudioFiles?.length ?? 0) > 0 && (
          <FileCount
            fileType="Audios"
            count={(audioFiles?.length ?? 0) + (pAudioFiles?.length ?? 0)}
          />
        )}
        {(pdfs?.length ?? 0) + (pPdfs?.length ?? 0) > 0 && (
          <FileCount
            fileType="PDFs"
            count={(pdfs?.length ?? 0) + (pPdfs?.length ?? 0)}
          />
        )}
        {(others?.length ?? 0) + (pOthers?.length ?? 0) > 0 && (
          <FileCount
            fileType="Others"
            count={(others?.length ?? 0) + (pOthers?.length ?? 0)}
          />
        )}
      </div>
      <PreviewWrapper>
        <AllPreviewAll files={files} previews={previews} />
      </PreviewWrapper>
    </div>
  );
}

function AllPreviewAll({
  files,
  previews,
}: {
  files: File[] | undefined;
  previews: string[] | undefined;
}) {
  return (
    <>
      {(files?.length ?? 0) + (previews?.length ?? 0) > 0 ? (
        <>
          {files &&
            files.length > 0 &&
            files.map((file, index) => (
              <PreviewAllItem key={index + file.name} file={file} />
            ))}
          {previews &&
            previews.length > 0 &&
            previews.map((file, index) => (
              <PreviewAllItem key={index + file} file={file} />
            ))}
        </>
      ) : (
        <>All selected images will be shown here.</>
      )}
    </>
  );
}

function PreviewAllItem({ file }: { file: File | string }) {
  const isFile = typeof file !== "string";
  const name = isFile ? file.name.toLowerCase() : file.toLowerCase();
  const type = isFile ? file.type.toLowerCase() : "";

  if (
    type.startsWith("image/") ||
    /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(name)
  ) {
    return <ImagesPreviewItem image={file} />;
  } else if (type === "application/pdf" || name.endsWith(".pdf")) {
    return <PDFPreviewItem pdf={file} />;
  } else if (type.startsWith("audio/") || /\.(mp3|wav|ogg)$/i.test(name)) {
    return <AudioPreviewItem audio={file} />;
  } else if (type.startsWith("video/") || /\.(mp4|mov|avi|webm)$/i.test(name)) {
    return <VideoPreviewItem video={file} />;
  } else {
    return <OtherFilePreviewItem other={file} />;
  }
}

// For Images Preview
function ImagesPreview({ className = "" }: { className?: string }) {
  const { images } = useDropzoneContext().categorizedFiles;
  const { images: pImages } = useDropzoneContext().categorizedPreviews;
  return (
    <div className={className}>
      {(images?.length ?? 0) + (pImages?.length ?? 0) > 0 && (
        <FileCount
          fileType="Images"
          count={(images?.length ?? 0) + (pImages?.length ?? 0)}
        />
      )}
      <PreviewWrapper>
        <AllImages images={images} pImages={pImages} />
      </PreviewWrapper>
    </div>
  );
}

function AllImages({
  images,
  pImages,
}: {
  images: File[] | undefined;
  pImages: string[] | undefined;
}) {
  return (
    <>
      {(images?.length ?? 0) + (pImages?.length ?? 0) > 0 ? (
        <>
          {images &&
            images.length > 0 &&
            images.map((image, index) => (
              <ImagesPreviewItem key={index + image.name} image={image} />
            ))}
          {pImages &&
            pImages.length > 0 &&
            pImages.map((image, index) => (
              <ImagesPreviewItem key={index + image} image={image} />
            ))}
        </>
      ) : (
        <>All selected images will be shown here.</>
      )}
    </>
  );
}

function ImagesPreviewItem({ image }: { image: File | string }) {
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof image === "string") {
      setPreview(image);
      setIsLoading(false); // optional: assume already loaded if URL
    } else {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
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
              alt={typeof image === "string" ? "Image preview" : image.name}
              className="object-cover w-full h-full"
              onLoad={handleImageLoad}
            />
            <RemoveFileButton file={image} />
            <OpenImageDialog image={image} />
          </div>
          <div className="text-xs text-center">
            {typeof image === "string"
              ? image.split("/").pop() // crude fallback for string URL
              : formatFileName(image.name)}
          </div>
        </div>
      )}
    </>
  );
}

function OpenImageDialog({ image }: { image: File | string }) {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof image === "string") {
      setImageURL(image);
      setIsLoading(false); // Optional: assume image is ready
    } else {
      const url = URL.createObjectURL(image);
      setImageURL(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Dialog>
      <OpenDialogButton />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {typeof image === "string" ? image.split("/").pop() : image.name}
          </DialogTitle>
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

// For video Files
function VideosPreview({ className = "" }: { className?: string }) {
  const { videoFiles } = useDropzoneContext().categorizedFiles;
  const { videoFiles: pVideoFiles } = useDropzoneContext().categorizedPreviews;
  return (
    <div className={className}>
      {(videoFiles?.length ?? 0) + (pVideoFiles?.length ?? 0) > 0 && (
        <FileCount
          fileType="Videos"
          count={(videoFiles?.length ?? 0) + (pVideoFiles?.length ?? 0)}
        />
      )}
      <PreviewWrapper>
        <AllVideos videos={videoFiles} pVideos={pVideoFiles} />
      </PreviewWrapper>
    </div>
  );
}

function AllVideos({
  videos,
  pVideos,
}: {
  videos: File[] | undefined;
  pVideos: string[] | undefined;
}) {
  return (
    <>
      {videos || pVideos ? (
        <>
          {videos &&
            videos.length > 0 &&
            videos.map((video, index) => (
              <VideoPreviewItem key={index + video.name} video={video} />
            ))}
          {pVideos &&
            pVideos.length > 0 &&
            pVideos.map((video, index) => (
              <VideoPreviewItem key={index + video} video={video} />
            ))}
        </>
      ) : (
        <>All selected videos will be shown here.</>
      )}
    </>
  );
}

const VideoPreviewItem = memo(({ video }: { video: File | string }) => {
  const [preview, setPreview] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof video === "string") {
      setPreview(video);
    } else {
      const objectUrl = URL.createObjectURL(video);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [video]);

  useEffect(() => {
    const captureFrame = async () => {
      const videoEl = videoRef.current;
      const canvasEl = canvasRef.current;
      if (!videoEl || !canvasEl) return;

      const duration = videoEl.duration;
      const captureTime = duration > 0.5 ? Math.random() * (duration - 0.5) : 0;
      await captureFrameAtTime(captureTime);
    };

    const captureFrameAtTime = (time: number) => {
      return new Promise<void>((resolve) => {
        const videoEl = videoRef.current;
        const canvasEl = canvasRef.current;
        if (!videoEl || !canvasEl) return resolve();

        const ctx = canvasEl.getContext("2d");
        if (!ctx) return resolve();

        videoEl.currentTime = time;

        videoEl.onseeked = () => {
          canvasEl.width = videoEl.videoWidth;
          canvasEl.height = videoEl.videoHeight;

          try {
            ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
            const imgDataUrl = canvasEl.toDataURL("image/png");
            setThumbnail(imgDataUrl);
          } catch (err) {
            console.warn("Unable to capture video thumbnail due to CORS.");
          }
          resolve();
        };
      });
    };

    const videoEl = videoRef.current;
    if (videoEl && preview) {
      videoEl.onloadedmetadata = () => {
        captureFrame();
      };
      videoEl.load();
    }
  }, [preview]);

  const displayName =
    typeof video === "string"
      ? video.split("/").pop()
      : formatFileName(video.name);

  return (
    <>
      {preview && (
        <div className="bg-muted p-1 rounded group">
          <div className="relative w-36 h-24 rounded overflow-hidden shadow bg-muted">
            <video
              ref={videoRef}
              src={preview}
              className="hidden"
              crossOrigin="anonymous" // note: may still trigger CORS issues with some URLs
            />
            <canvas ref={canvasRef} className="hidden" />

            {thumbnail ? (
              <img
                src={thumbnail}
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
          <div className="text-xs text-center block mt-1">{displayName}</div>
        </div>
      )}
    </>
  );
});

function PlayVideoDialog({ video }: { video: File | string }) {
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof video === "string") {
      setVideoURL(video);
    } else {
      const url = URL.createObjectURL(video);
      setVideoURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [video]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const displayName =
    typeof video === "string"
      ? video.split("/").pop() ?? "Video"
      : formatFileName(video.name);

  return (
    <Dialog>
      <OpenDialogButton />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{displayName}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
              <Loader2 className="animate-spin text-white" />
            </div>
          )}
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
function AudiosPreview({ className = "" }: { className?: string }) {
  const { audioFiles } = useDropzoneContext().categorizedFiles;
  const { audioFiles: pAudioFiles } = useDropzoneContext().categorizedPreviews;
  return (
    <div className={className}>
      {(audioFiles?.length ?? 0) + (pAudioFiles?.length ?? 0) > 0 && (
        <FileCount
          fileType="Audios"
          count={(audioFiles?.length ?? 0) + (pAudioFiles?.length ?? 0)}
        />
      )}
      <PreviewWrapper>
        <AllAudios audios={audioFiles} pAudios={pAudioFiles} />
      </PreviewWrapper>
    </div>
  );
}

function AllAudios({
  audios,
  pAudios,
}: {
  audios: File[] | undefined;
  pAudios: string[] | undefined;
}) {
  return (
    <>
      {audios || pAudios ? (
        <>
          {audios &&
            audios.length > 0 &&
            audios.map((audio, index) => (
              <AudioPreviewItem key={index + audio.name} audio={audio} />
            ))}
          {pAudios &&
            pAudios.length > 0 &&
            pAudios.map((audio, index) => (
              <AudioPreviewItem key={index + audio} audio={audio} />
            ))}
        </>
      ) : (
        <>All selected audios will be shown here.</>
      )}
    </>
  );
}

function AudioPreviewItem({ audio }: { audio: File | string }) {
  const displayName =
    typeof audio === "string"
      ? audio.split("/").pop() ?? "Audio"
      : formatFileName(audio.name);

  return (
    <div className="bg-muted p-1 rounded group">
      <div className="relative w-36 h-24 rounded shadow flex items-center justify-center bg-green-200 text-green-600">
        <Music size={64} />
        <RemoveFileButton file={audio} />
        <PlayAudioDialog audio={audio} />
      </div>
      <div className="text-xs text-center">{displayName}</div>
    </div>
  );
}

function PlayAudioDialog({ audio }: { audio: File | string }) {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let url: string;

    if (typeof audio === "string") {
      url = audio;
      setAudioURL(url);
    } else {
      url = URL.createObjectURL(audio);
      setAudioURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audio]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const displayName =
    typeof audio === "string" ? audio.split("/").pop() ?? "Audio" : audio.name;

  return (
    <Dialog>
      <OpenDialogButton />
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{displayName}</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-col items-center justify-center gap-4">
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
function PDFsPreview({ className = "" }: { className?: string }) {
  const { pdfs } = useDropzoneContext().categorizedFiles;
  const { pdfs: pPdfs } = useDropzoneContext().categorizedPreviews;
  return (
    <div className={className}>
      {(pdfs?.length ?? 0) + (pPdfs?.length ?? 0) > 0 && (
        <FileCount
          fileType="PDFs"
          count={(pdfs?.length ?? 0) + (pPdfs?.length ?? 0)}
        />
      )}
      <PreviewWrapper>
        <AllPDFs pdfs={pdfs} pPdfs={pPdfs} />
      </PreviewWrapper>
    </div>
  );
}

function AllPDFs({
  pdfs,
  pPdfs,
}: {
  pdfs: File[] | undefined;
  pPdfs: string[] | undefined;
}) {
  return (
    <>
      {pdfs || pPdfs ? (
        <>
          {pdfs &&
            pdfs.length > 0 &&
            pdfs.map((pdf, index) => (
              <PDFPreviewItem key={index + pdf.name} pdf={pdf} />
            ))}
          {pPdfs &&
            pPdfs.length > 0 &&
            pPdfs.map((pdf, index) => (
              <PDFPreviewItem key={index + pdf} pdf={pdf} />
            ))}
        </>
      ) : (
        <>All selected pdfs will be shown here.</>
      )}
    </>
  );
}

function PDFPreviewItem({ pdf }: { pdf: File | string }) {
  const fileName =
    typeof pdf === "string" ? pdf.split("/").pop() || "PDF" : pdf.name;

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
      <div className="text-xs text-center">{formatFileName(fileName)}</div>
    </div>
  );
}

// For Other Files
function OtherFilesPreview({ className = "" }: { className?: string }) {
  const { others } = useDropzoneContext().categorizedFiles;
  const { others: pOthers } = useDropzoneContext().categorizedPreviews;
  return (
    <div className={className}>
      {(others?.length ?? 0) + (pOthers?.length ?? 0) > 0 && (
        <FileCount
          fileType="Excel Files"
          count={(others?.length ?? 0) + (pOthers?.length ?? 0)}
        />
      )}
      <PreviewWrapper>
        <AllOthersFiles others={others} pOthers={pOthers} />
      </PreviewWrapper>
    </div>
  );
}

function AllOthersFiles({
  others,
  pOthers,
}: {
  others: File[] | undefined;
  pOthers: string[] | undefined;
}) {
  return (
    <>
      {others || pOthers ? (
        <>
          {others &&
            others.length > 0 &&
            others.map((other, index) => (
              <OtherFilePreviewItem key={index + other.name} other={other} />
            ))}
          {pOthers &&
            pOthers.length > 0 &&
            pOthers.map((other, index) => (
              <OtherFilePreviewItem key={index + other} other={other} />
            ))}
        </>
      ) : (
        <>All selected other files will be shown here.</>
      )}
    </>
  );
}

function OtherFilePreviewItem({ other }: { other: File | string }) {
  const fileName =
    typeof other === "string"
      ? other.split("/").pop() || "Unnamed"
      : other.name;

  const fileExtension = fileName.split(".").pop()?.toUpperCase() || "N/A";

  return (
    <div className="bg-muted p-1 rounded group">
      <div className="relative w-36 h-24 rounded overflow-hidden shadow bg-muted">
        <FormatFileIcon
          fileType={fileExtension}
          className="bg-accent-foreground text-accent"
        />
        <RemoveFileButton file={other} />
      </div>
      <div className="text-xs text-center">{formatFileName(fileName)}</div>
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

function RemoveFileButton({ file }: { file: File | string }) {
  const { removeFile, removePreview } = useDropzoneContext();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof file === "string") {
          removePreview(file);
        } else {
          removeFile(file);
        }
      }}
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

function categorizeFiles(files: File[]): CategorizedFiles {
  const categorized: CategorizedFiles = {};

  files.forEach((file) => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (type.startsWith("image/")) {
      categorized.images ??= [];
      categorized.images.push(file);
    } else if (type === "application/pdf" || name.endsWith(".pdf")) {
      categorized.pdfs ??= [];
      categorized.pdfs.push(file);
    } else if (
      type.startsWith("audio/") ||
      name.endsWith(".mp3") ||
      name.endsWith(".wav") ||
      name.endsWith(".ogg")
    ) {
      categorized.audioFiles ??= [];
      categorized.audioFiles.push(file);
    } else if (
      type.startsWith("video/") ||
      name.endsWith(".mp4") ||
      name.endsWith(".mov") ||
      name.endsWith(".avi")
    ) {
      categorized.videoFiles ??= [];
      categorized.videoFiles.push(file);
    } else {
      categorized.others ??= [];
      categorized.others.push(file);
    }
  });

  return categorized;
}

function categorizePreviews(urls: string[]): CategorizedPreviews {
  const categorized: CategorizedPreviews = {};

  urls.forEach((url) => {
    const extension = url.split(".").pop()?.toLowerCase() || "";

    if (
      ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(extension)
    ) {
      categorized.images ??= [];
      categorized.images.push(url);
    } else if (extension === "pdf") {
      categorized.pdfs ??= [];
      categorized.pdfs.push(url);
    } else if (
      ["mp3", "wav", "ogg", "aac", "flac", "m4a"].includes(extension)
    ) {
      categorized.audioFiles ??= [];
      categorized.audioFiles.push(url);
    } else if (["mp4", "mov", "avi", "mkv", "webm"].includes(extension)) {
      categorized.videoFiles ??= [];
      categorized.videoFiles.push(url);
    } else {
      categorized.others ??= [];
      categorized.others.push(url);
    }
  });

  return categorized;
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
