const SectionsResolver = require("./sections");
const TopicsResolver = require("./topics");
const WordsResolver = require("./words");

const rootResolver = {
  ...SectionsResolver,
  ...TopicsResolver,
  ...WordsResolver,
};

module.exports = rootResolver;
