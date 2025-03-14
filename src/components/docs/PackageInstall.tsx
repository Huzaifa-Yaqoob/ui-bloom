"use client";

import { useEffect, useState } from "react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import config from "config";

export default function PackageInstall({ name }: { name: string }) {
  const [isMounted, setIsMounted] = useState(false);

  const packageManagers = [
    {
      name: "npm",
      command: `npx shadcn@latest add ${config.baseUrl}/r/${name}.json`,
    },
    {
      name: "pnpm",
      command: `pnpm dlx shadcn@latest add ${config.baseUrl}/r/${name}.json`,
    },
    {
      name: "yarn",
      command: `npx shadcn@latest add ${config.baseUrl}/r/${name}.json`,
    },
    {
      name: "bun",
      command: `bunx --bun shadcn@latest add ${config.baseUrl}/r/${name}.json`,
    },
  ];

  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Tabs items={packageManagers.map((pm) => pm.name)}>
      {packageManagers.map((pm) => (
        <Tab key={pm.name} value={pm.name}>
          {isMounted && <DynamicCodeBlock lang="bash" code={pm.command} />}
        </Tab>
      ))}
    </Tabs>
  );
}
