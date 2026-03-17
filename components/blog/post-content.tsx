type PostContentProps = {
  content: string;
};

export function PostContent({ content }: PostContentProps) {
  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <section className="space-y-4 text-slate-800 dark:text-slate-200">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-semibold tracking-tight">
              {block.slice(4)}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-semibold tracking-tight">
              {block.slice(3)}
            </h2>
          );
        }

        if (block.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-bold tracking-tight">
              {block.slice(2)}
            </h1>
          );
        }

        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((line) => line.startsWith("- "));

        if (isList) {
          return (
            <ul key={index} className="list-disc space-y-1 pl-6">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="leading-7">
            {block}
          </p>
        );
      })}
    </section>
  );
}