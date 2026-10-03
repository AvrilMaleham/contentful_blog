function slugFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

module.exports = function (migration) {
  const article = migration.editContentType("article");

  const slug = article
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .validations([{ unique: true }]);

  article.changeFieldControl("slug", "builtin", "slugEditor");

  migration.transformEntries({
    contentType: "article",
    from: ["title"],
    to: ["slug"],
    transformEntryForLocale: (fromFields, locale) => {
      const title = fromFields.title?.[locale];
      if (typeof title !== "string") {
        return;
      }

      return { slug: slugFromTitle(title) };
    },
  });

  slug.required(true);
};
