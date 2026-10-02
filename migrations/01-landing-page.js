module.exports = function (migration) {
  const landingPage = migration
    .createContentType("landingPage")
    .name("Landing Page")
    .description("Homepage title, headline, and the sections shown on it.")
    .displayField("title");

  const title = landingPage
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  const headline = landingPage
    .createField("headline")
    .name("Headline")
    .type("Symbol")
    .required(true);

  const sections = landingPage
    .createField("sections")
    .name("Sections")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["section"] }],
    });
};
