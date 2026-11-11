import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="flex flex-col items-center px-gutter py-[clamp(6rem,14vw,12rem)] text-center">
      <p className="max-w-[22em] text-statement">{about.statement}</p>
      <p className="mt-8 max-w-[34rem]">{about.body}</p>
    </section>
  );
}
