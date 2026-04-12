import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function PageSection({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-68px)]", className)}>
      {children}
    </div>
  );
}
