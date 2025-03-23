import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { source } from "@/lib/source";

const baseOptionNoLinks: BaseLayoutProps = { ...baseOptions, links: [] };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptionNoLinks}
      githubUrl="https://github.com/Huzaifa-Yaqoob/ui-bloom"
    >
      {children}
    </DocsLayout>
  );
}
