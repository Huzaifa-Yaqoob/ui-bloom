import { Linkedin, Github } from 'lucide-react';
import Logo from '@/components/icons/Logo';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center mt-8 container">
      <div className="flex flex-col items-center gap-4 w-fit dark:text-white text-black">
        <Logo width={128} height={128} />{' '}
        <h1 className="text-6xl font-bold text-center">UI Bloom</h1>
        <h3 className="text-2xl text-center">
          A progressive Shadcn UI Registry for next.js 15 + react 19.
        </h3>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16 mt-8 text-center grow">
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
      <div className="mx-4 md:mx-8 lg:mx-16 flex items-center gap-4 mb-4">
        <a
          href="www.linkedin.com/in/huzaifa-yaqoob"
          className="flex items-center gap-2 justify-center"
        >
          <Linkedin className="bg-muted h-8 w-8 p-1 rounded" />{' '}
          <span>Huzaifa Yaqoob</span>
        </a>
        <a
          href="https://github.com/Huzaifa-Yaqoob"
          className="flex items-center gap-2 justify-center"
        >
          <Github className="bg-muted h-8 w-8 p-1 rounded" />{' '}
          <span>Huzaifa-Yaqoob</span>
        </a>
      </div>
    </main>
  );
}
