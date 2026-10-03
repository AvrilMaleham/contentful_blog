import { notFound } from "next/navigation";
import type {
  Asset,
  Entry,
  EntrySkeletonType,
  UnresolvedLink,
} from "contentful";
import Section from "@/components/Section";
import { getLandingPage } from "@/lib/contentful";

function isEntry<Skeleton extends EntrySkeletonType>(
  value: Entry<Skeleton> | UnresolvedLink<"Entry"> | undefined,
): value is Entry<Skeleton> {
  return value?.sys.type === "Entry";
}

function isAsset(
  value: Asset | UnresolvedLink<"Asset"> | undefined,
): value is Asset {
  return value?.sys.type === "Asset";
}

function imageUrl(url: string) {
  return url.startsWith("//") ? `https:${url}` : url;
}

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
