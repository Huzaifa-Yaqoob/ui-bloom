import Link from "next/link";

import { mainLisLinks } from "@/components/common/links";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MainNavList({ className }: { className?: string }) {
  return (
    <ul className={cn("hidden items-center gap-2 md:flex lg:gap-8", className)}>
      <li className={"hidden md:block"}>
        <Button variant={"ghost"} size={"icon-lg"}>
          <Logo className={"size-6"} />
        </Button>
      </li>
      {mainLisLinks.map((link) => (
        <li key={link.path} className={"w-full md:w-fit"}>
          <Button
            variant={"ghost"}
            render={<Link href={link.path} />}
            nativeButton={false}
            size={"lg"}
            className={"w-full justify-start md:justify-center"}
          >
            {link.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default MainNavList;
