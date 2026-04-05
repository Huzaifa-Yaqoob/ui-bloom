import { Section } from "@/components/common/Section";
import GithubStars from "@/components/navbar/GithubStars";
import MainNavList from "@/components/navbar/MainNavList";
import ThemeToggle from "@/components/navbar/ThemeToggle";

function Navbar() {
  return (
    <Section sectionSize="sm" render={<nav />} className={"flex items-center justify-between"}>
      <MainNavList />
      <div>
        <GithubStars />
        <ThemeToggle />
      </div>
    </Section>
  );
}

export default Navbar;
