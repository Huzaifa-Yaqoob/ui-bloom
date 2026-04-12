import Link from "next/link";

import Logo from "@/components/common/Logo";
import { Section } from "@/components/common/Section";
import GithubStars from "@/components/navbar/GithubStars";
import LinksListDrawer from "@/components/navbar/LinksListDrawer";
import MainNavList from "@/components/navbar/MainNavList";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <Section
      sectionSize="sm"
      render={<nav />}
      className={"relative sticky top-0 z-[60] flex items-center justify-between bg-background"}
    >
      <div className={"flex items-center gap-4"}>
        <LinksListDrawer />
        <Button
          variant={"ghost"}
          size={"icon-lg"}
          nativeButton={false}
          render={<Link href={"/"} />}
        >
          <Logo className={"size-8"} />
        </Button>
        <MainNavList />
      </div>
      <div>
        <GithubStars />
        <ThemeToggle />
      </div>
    </Section>
  );
}

export default Navbar;
