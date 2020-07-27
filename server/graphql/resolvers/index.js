const SectionsResolver = require("./sections");
const TopicsResolver = require("./topics");
const WordsResolver = require("./words");
const TopicsUserProgress = require("./topicsUserProgress");
const AuthResolver = require("./auth");

const rootResolver = {
  ...AuthResolver,
  ...SectionsResolver,
  ...TopicsResolver,
  ...WordsResolver,
  ...TopicsUserProgress,
};

module.exports = rootResolver;
