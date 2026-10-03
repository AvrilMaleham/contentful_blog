import {
  createClient,
  type EntryFieldTypes,
  type EntrySkeletonType,
} from "contentful";

const space = process.env.NEXT_PUBLIC_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_DELIVERY_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "master";

if (!space || !accessToken) {
  throw new Error("Set NEXT_PUBLIC_SPACE_ID and NEXT_PUBLIC_DELIVERY_TOKEN.");
}

const client = createClient({
  space,
  accessToken,
  environment,
});

type AuthorSkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Symbol;
  },
  "author"
>;

type ArticleSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    preview: EntryFieldTypes.Symbol;
    body: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
    author: EntryFieldTypes.EntryLink<AuthorSkeleton>;
  },
  "article"
>;

type SectionSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Symbol;
    articles: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ArticleSkeleton>>;
  },
  "section"
>;

type LandingPageSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Symbol;
    headline: EntryFieldTypes.Symbol;
    sections: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<SectionSkeleton>>;
  },
  "landingPage"
>;

export async function getLandingPage() {
  const entries = await client.getEntries<LandingPageSkeleton>({
    content_type: "landingPage",
    include: 3,
    limit: 1,
  });

  return entries.items[0] ?? null;
}

export async function getArticleSlugs() {
  const entries = await client.getEntries<ArticleSkeleton>({
    content_type: "article",
    select: ["fields.slug"],
    limit: 100,
  });

  return entries.items.flatMap((entry) =>
    entry.fields.slug ? [entry.fields.slug] : [],
  );
}

export async function getArticleBySlug(slug: string) {
  const entries = await client.getEntries<ArticleSkeleton>({
    content_type: "article",
    "fields.slug": slug,
    include: 1,
    limit: 1,
  });

  return entries.items[0] ?? null;
}
