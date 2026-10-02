module.exports = function (migration) {
  const article = migration
    .createContentType("article")
    .name("Article")
    .description("A routine note with a title, preview, body, image, and author.")
    .displayField("title");

  const title = article
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  const preview = article
    .createField("preview")
    .name("Preview")
    .type("Symbol")
    .required(true);

  const body = article.createField("body").name("Body").type("Text").required(true);

  const image = article
    .createField("image")
    .name("Image")
    .type("Link")
    .linkType("Asset")
    .required(true)
    .validations([{ linkMimetypeGroup: ["image"] }]);

  const author = article
    .createField("author")
    .name("Author")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["author"] }]);
};
