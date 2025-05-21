'use client';

import { useState } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { OpenInV0 } from './OpenInV0';
import PreviewWrapper from '../common/preview-wrapper';

export default function PreviewTabs({
  component,
  code,
  name,
}: {
  component: React.ReactNode;
  code: string;
  name: string;
}) {
  const [isUi, setIsUi] = useState(true);

  return (
    <div className="space-y-4">
      <div className="border-b flex justify-between items-center">
        <div>
          <button
            onClick={() => {
              setIsUi(true);
            }}
            className={
              'p-4 border-foreground cursor-pointer ' + (isUi && 'border-b')
            }
          >
            UI
          </button>
          <button
            onClick={() => {
              setIsUi(false);
            }}
            className={
              'p-4 border-foreground cursor-pointer ' + (!isUi && 'border-b')
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
