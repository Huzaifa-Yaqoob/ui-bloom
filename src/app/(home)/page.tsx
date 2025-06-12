import { Linkedin, Github } from 'lucide-react';
import Logo from '@/components/icons/Logo';

export default function HomePage() {
  return (
    <main className="container mt-8 flex flex-1 flex-col items-center">
      <div className="flex w-fit flex-col items-center gap-4 text-black dark:text-white">
        <Logo width={128} height={128} />{' '}
        <h1 className="text-center text-6xl font-bold">UI Bloom</h1>
        <h3 className="text-center text-2xl">
          A progressive Shadcn UI Registry for next.js 15 + react 19.
        </h3>
      </div>
      <div className="mx-4 mt-8 grow text-center md:mx-8 lg:mx-16">
        Say hello to UI Bloom — where components don&apos;t just work… they
        flourish 🌼. Built on top of the elegant Shadcn UI, and fine-tuned for
        the latest and greatest — Next.js 15 and React 19 — this registry is
        like your front-end playground, blooming with ready-to-pick components.
        Tired of digging through clunky design systems or bloated UI kits? UI
        Bloom is lightweight, flexible, and built for devs who like their code
        clean and their UI crisp. From buttons that bounce with joy to cards
        that snap into place, every component here is handpicked to save you
        time and spark joy ✨.
      </div>
      <div className="mx-4 mb-4 flex items-center gap-4 md:mx-8 lg:mx-16">
        <a
          href="http://www.linkedin.com/in/huzaifa-yaqoob"
          className="flex items-center justify-center gap-2"
        >
          <Linkedin className="bg-muted h-8 w-8 rounded p-1" />{' '}
          <span>Huzaifa Yaqoob</span>
        </a>
        <a
          href="https://github.com/Huzaifa-Yaqoob"
          className="flex items-center justify-center gap-2"
        >
          <Github className="bg-muted h-8 w-8 rounded p-1" />{' '}
          <span>Huzaifa-Yaqoob</span>
        </a>
      </div>
    </main>
  );
}
