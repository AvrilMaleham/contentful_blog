import Article from "@/components/Article";

type ArticleContent = {
  title: string;
  body: string;
  image: string;
  author: string;
};

type SectionProps = {
  title: string;
  articles: ArticleContent[];
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
