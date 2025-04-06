import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Logo from "@/components/icons/Logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2 w-fit dark:text-white text-black">
        <Logo width={32} height={32} /> UI Bloom
      </div>
    ),
  },
  links: [
    {
      text: "Components",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
