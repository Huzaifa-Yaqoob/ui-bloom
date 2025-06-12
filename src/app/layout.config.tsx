import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/components/icons/Logo';

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
      <div className="flex w-fit items-center gap-2 text-black dark:text-white">
        <Logo width={32} height={32} /> UI Bloom
      </div>
    ),
  },
  links: [
    {
      text: 'How To use',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: 'Components',
      url: '/docs/field-renderer',
      active: 'nested-url',
    },
    {
      text: 'Hooks',
      url: '/docs/use-screen-width',
      active: 'nested-url',
    },
  ],
};
