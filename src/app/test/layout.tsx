import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex items-center justify-center h-svh ">{children}</main>
  );
}
