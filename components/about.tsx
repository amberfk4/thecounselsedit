import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="flex flex-col items-center bg-taupe px-gutter py-[clamp(3.5rem,7vw,6rem)] text-center text-ink">
      <p className="max-w-[22em] text-statement">{about.statement}</p>
      <p className="mt-8 max-w-[34rem]">{about.body}</p>
    </section>
  );
}
