"use client";

import { useState, useEffect } from "react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { OpenInV0 } from "./OpenInV0";
import PreviewWrapper from "../common/preview-wrapper";

export default function PreviewTabs({
  component,
  fileUrl,
  name,
}: {
  component: React.ReactNode;
  fileUrl: string;
  name: string;
}) {
  const [isUi, setIsUi] = useState(true);
  const [componentSourceCode, setComponentSourceCode] = useState("");

  useEffect(() => {
    fetch(`/api/read-file?file=${encodeURIComponent("src/" + fileUrl)}`)
      .then((res) => res.json())
      .then((data) => setComponentSourceCode(data.content))
      .catch(() => setComponentSourceCode("Error loading file content."));
  }, [fileUrl]);

  return (
    <div className="space-y-4">
      <div className="border-b flex justify-between items-center">
        <div>
          <button
            onClick={() => {
              setIsUi(true);
            }}
            className={
              "p-4 border-foreground cursor-pointer " + (isUi && "border-b")
            }
          >
            UI
          </button>
          <button
            onClick={() => {
              setIsUi(false);
            }}
            className={
              "p-4 border-foreground cursor-pointer " + (!isUi && "border-b")
            }
          >
            Code
          </button>
        </div>
        <OpenInV0 name={name} />
      </div>
      {isUi ? (
        <PreviewWrapper>{component}</PreviewWrapper>
      ) : (
        <DynamicCodeBlock lang="typescript" code={componentSourceCode} />
      )}
    </div>
  );
}
