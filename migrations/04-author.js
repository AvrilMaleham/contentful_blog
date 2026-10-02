module.exports = function (migration) {
  const author = migration
    .createContentType("author")
    .name("Author")
    .description("The person credited on an article.")
    .displayField("name");

  const name = author.createField("name").name("Name").type("Symbol").required(true);
};
