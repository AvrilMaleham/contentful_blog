import { createClient } from "contentful-management";

const spaceId = process.env.NEXT_PUBLIC_SPACE_ID;
const managementToken = process.env.CMA_TOKEN;
const environmentId = process.env.NEXT_PUBLIC_ENVIRONMENT || "master";

if (!spaceId || !managementToken) {
  console.error("Set NEXT_PUBLIC_SPACE_ID and CMA_TOKEN.");
  process.exit(1);
}

async function deleteEntry(entry) {
  let current = entry;

  if (current.isArchived()) {
    console.log(`Unarchiving entry ${current.sys.id}`);
    current = await current.unarchive();
  }

  if (current.isPublished()) {
    console.log(`Unpublishing entry ${current.sys.id}`);
    current = await current.unpublish();
  }

  console.log(`Deleting entry ${current.sys.id}`);
  await current.delete();
}

async function deleteAllEntries(environment) {
  const queries = [{}, { "sys.archivedAt[exists]": true }];
  let deleted = 0;

  for (const query of queries) {
    for (;;) {
      const entries = await environment.getEntries({ ...query, limit: 100 });
      if (entries.items.length === 0) break;

      for (const entry of entries.items) {
        await deleteEntry(entry);
        deleted += 1;
      }
    }
  }

  return deleted;
}

async function deleteAllContentTypes(environment) {
  let deleted = 0;

  for (;;) {
    const contentTypes = await environment.getContentTypes({ limit: 100 });
    if (contentTypes.items.length === 0) break;

    let progress = false;

    for (const contentType of contentTypes.items) {
      try {
        let current = contentType;

        if (current.isPublished()) {
          console.log(`Unpublishing content type ${current.sys.id}`);
          current = await current.unpublish();
        }

        console.log(`Deleting content type ${current.name} (${current.sys.id})`);
        await current.delete();
        deleted += 1;
        progress = true;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log(`Could not delete content type ${contentType.sys.id} yet: ${message}`);
      }
    }

    if (!progress) {
      throw new Error("Stopped because the remaining content types could not be deleted.");
    }
  }

  return deleted;
}

const client = createClient({ accessToken: managementToken }, { type: "legacy" });
const space = await client.getSpace(spaceId);
const environment = await space.getEnvironment(environmentId);

const entriesDeleted = await deleteAllEntries(environment);
const contentTypesDeleted = await deleteAllContentTypes(environment);

const entriesLeft = await environment.getEntries({ limit: 0 });
const contentTypesLeft = await environment.getContentTypes({ limit: 0 });

console.log(
  `Deleted ${entriesDeleted} entries and ${contentTypesDeleted} content types from "${environmentId}".`,
);
console.log(
  `Remaining: ${entriesLeft.total} entries, ${contentTypesLeft.total} content types.`,
);
