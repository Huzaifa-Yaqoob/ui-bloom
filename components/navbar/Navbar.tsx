import { Section } from "@/components/common/Section";
import GithubStars from "@/components/navbar/GithubStars";
import LinksListDrawer from "@/components/navbar/LinksListDrawer";
import MainNavList from "@/components/navbar/MainNavList";
import ThemeToggle from "@/components/navbar/ThemeToggle";

function Navbar() {
  return (
    <Section
      sectionSize="sm"
      render={<nav />}
      className={"relative sticky top-0 z-[60] flex items-center justify-between bg-background"}
    >
      <LinksListDrawer />
      <MainNavList />
      <div>
        <GithubStars />
        <ThemeToggle />
      </div>
    </Section>
  );
}

export default Navbar;
