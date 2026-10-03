import type {
  Asset,
  Entry,
  EntrySkeletonType,
  UnresolvedLink,
} from "contentful";

export function isEntry<Skeleton extends EntrySkeletonType>(
  value: Entry<Skeleton> | UnresolvedLink<"Entry"> | undefined,
): value is Entry<Skeleton> {
  return value?.sys.type === "Entry";
}

export function isAsset(
  value: Asset | UnresolvedLink<"Asset"> | undefined,
): value is Asset {
  return value?.sys.type === "Asset";
}

export function imageUrl(url: string) {
  return url.startsWith("//") ? `https:${url}` : url;
}
