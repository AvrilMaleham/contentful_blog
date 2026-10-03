import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/contentful";
import { imageUrl, isAsset, isEntry } from "@/lib/contentful-fields";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const image = article.fields.image;
  const author = article.fields.author;

  if (!isAsset(image) || !image.fields.file?.url) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="text-sm text-stone-500 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-800"
      >
        Back
      </Link>
      <div className="relative mt-8 aspect-3/2 w-full bg-stone-200">
        <Image
          src={imageUrl(image.fields.file.url)}
          alt=""
          fill
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
        />
      </div>
      <h1 className="mt-8 text-4xl tracking-tight">{article.fields.title}</h1>
      <p className="mt-4 text-sm text-stone-500">
        {isEntry(author) ? author.fields.name : ""}
      </p>
      <p className="mt-8 leading-relaxed whitespace-pre-line text-stone-700">
        {article.fields.body}
      </p>
    </main>
  );
}
