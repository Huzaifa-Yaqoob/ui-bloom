import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-svh items-center justify-center">{children}</main>
  );
}
