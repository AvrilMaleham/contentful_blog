import Image from "next/image";
import Link from "next/link";

type ArticleProps = {
  title: string;
  slug: string;
  preview: string;
  image: string;
  author: string;
};

export default function Article({
  title,
  slug,
  preview,
  image,
  author,
}: ArticleProps) {
  return (
    <article>
      <div className="relative mb-4 aspect-3/2 w-full bg-stone-200">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover"
        />
      </div>
      <h3 className="text-xl">
        <Link
          href={`/articles/${slug}`}
          className="underline decoration-stone-300 underline-offset-4 hover:decoration-stone-800"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-2 leading-relaxed text-stone-700">{preview}</p>
      <p className="mt-4 text-sm text-stone-500">{author}</p>
    </article>
  );
}
