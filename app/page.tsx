import { Section } from "@/components/common/Section";

export default function Posts() {
  return (
    <Section
      render={<main />}
      className={
        "grid min-h-[calc(100vh-48px)] place-items-center bg-red-400 md:min-h-[calc(100vh-68px)]"
      }
    >
      Page
    </Section>
  );
}
