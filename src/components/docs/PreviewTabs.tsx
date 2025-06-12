'use client';

import { useState, ReactNode } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { OpenInV0 } from './OpenInV0';
import PreviewWrapper from '../common/preview-wrapper';

export default function PreviewTabs({
  component,
  code,
  name,
}: {
  component: ReactNode;
  code: string;
  name: string;
}) {
  const [isUi, setIsUi] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b">
        <div>
          <button
            onClick={() => {
              setIsUi(true);
            }}
            className={
              'border-foreground cursor-pointer p-4 ' + (isUi && 'border-b')
            }
          >
            UI
          </button>
          <button
            onClick={() => {
              setIsUi(false);
            }}
            className={
              'border-foreground cursor-pointer p-4 ' + (!isUi && 'border-b')
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
        <DynamicCodeBlock lang="tsx" code={code} />
      )}
    </div>
  );
}
