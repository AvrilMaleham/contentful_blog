import Section from "@/components/Section";
import blog from "@/data/blog.json";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-16 max-w-2xl">
        <h1 className="text-5xl tracking-tight">{blog.title}</h1>
        <p className="mt-4 text-lg text-stone-600">{blog.headline}</p>
      </header>
      <div className="space-y-16">
        {blog.sections.map((section) => (
          <Section
            key={section.title}
            title={section.title}
            articles={section.articles}
          />
        ))}
      </div>
    </main>
  );
}
