export function SignedText({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  const lastWord = words.pop();

  return (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="whitespace-nowrap">
        {lastWord}
        <span aria-hidden="true" className="signing-line" />
      </span>
    </>
  );
}
