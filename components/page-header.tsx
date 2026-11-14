import { SignedText } from "./signed-text";

type PageHeaderProps = {
  title: string;
  intro?: string;
};

export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="pt-bar">
      <h1 className="hero-title px-gutter py-[clamp(2rem,6svh,4rem)]">
        <SignedText text={title} />
      </h1>
      {intro && (
        <div className="border-t border-navy p-gutter">
          <p className="max-w-[34rem]">{intro}</p>
        </div>
      )}
    </header>
  );
}
