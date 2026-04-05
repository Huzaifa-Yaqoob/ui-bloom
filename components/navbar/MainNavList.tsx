import Link from "next/link";

import { mainLisLinks } from "@/components/common/links";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

function MainNavList() {
  return (
    <ul className={"flex items-center gap-4 sm:gap-6 lg:gap-8"}>
      <li>
        <Button variant={"ghost"} size={"icon-lg"}>
          <Logo className={"size-6"} />
        </Button>
      </li>
      {mainLisLinks.map((link) => (
        <li key={link.path}>
          <Button
            variant={"ghost"}
            render={<Link href={link.path} />}
            nativeButton={false}
            size={"lg"}
          >
            {link.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default MainNavList;
