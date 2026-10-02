import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import blog from "@/data/blog.json";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const article = blog.sections
    .flatMap((section) => section.articles)
    .find((article) => article.title === decodeURIComponent(title));

  if (!article) {
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
          src={article.image}
          alt=""
          fill
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
        />
      </div>
      <h1 className="mt-8 text-4xl tracking-tight">{article.title}</h1>
      <p className="mt-4 text-sm text-stone-500">{article.author}</p>
      <p className="mt-8 leading-relaxed whitespace-pre-line text-stone-700">
        {article.body}
      </p>
    </main>
  );
}
