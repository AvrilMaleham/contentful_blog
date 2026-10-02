module.exports = function (migration) {
  const section = migration
    .createContentType("section")
    .name("Section")
    .description("A group of articles on the homepage, such as Hair, Makeup, or Skincare.")
    .displayField("title");

  const title = section
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  const articles = section
    .createField("articles")
    .name("Articles")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["article"] }],
    });
};
