const SectionsResolver = require("./R-sections");
const TopicsResolver = require("./R-topics");
const WordsResolver = require("./R-words");
const TopicsUserProgress = require("./R-topicsUserProgress");
const AuthResolver = require("./R-auth");

const rootResolver = {
  ...AuthResolver,
  ...SectionsResolver,
  ...TopicsResolver,
  ...WordsResolver,
  ...TopicsUserProgress,
};

module.exports = rootResolver;
