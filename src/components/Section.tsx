import Article from "@/components/Article";

type SectionProps = {
  title: string;
  articles: {
    title: string;
    preview: string;
    image: string;
    author: string;
  }[];
};

export default function Section({ title, articles }: SectionProps) {
  return (
    <section className="border-t border-stone-300 pt-10">
      <h2 className="mb-8 text-3xl">{title}</h2>
      <div className="grid gap-10 sm:grid-cols-2">
        {articles.map((article) => (
          <Article key={article.title} {...article} />
        ))}
      </div>
    </section>
  );
}
