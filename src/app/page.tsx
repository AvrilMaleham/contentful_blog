import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { getLandingPage } from "@/lib/contentful";
import { imageUrl, isAsset, isEntry } from "@/lib/contentful-fields";

export default async function Home() {
  const page = await getLandingPage();

  if (!page) {
    notFound();
  }

  const sections = page.fields.sections.flatMap((section) => {
    if (!isEntry(section)) {
      return [];
    }

    const articles = section.fields.articles.flatMap((article) => {
      if (!isEntry(article)) {
        return [];
      }

      const image = article.fields.image;
      const author = article.fields.author;
      if (!isAsset(image) || !image.fields.file?.url) {
        return [];
      }

      return [
        {
          title: article.fields.title,
          slug: article.fields.slug,
          preview: article.fields.preview,
          image: imageUrl(image.fields.file.url),
          author: isEntry(author) ? author.fields.name : "",
        },
      ];
    });

    return [
      {
        title: section.fields.title,
        articles,
      },
    ];
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-16 max-w-2xl">
        <h1 className="text-5xl tracking-tight">{page.fields.title}</h1>
        <p className="mt-4 text-lg text-stone-600">{page.fields.headline}</p>
      </header>
      <div className="space-y-16">
        {sections.map((section) => (
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
