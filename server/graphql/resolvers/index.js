const SectionsResolver = require("./sections");
const TopicsResolver = require("./topics");

const rootResolver = {
  ...SectionsResolver,
  ...TopicsResolver,
};

module.exports = rootResolver;
