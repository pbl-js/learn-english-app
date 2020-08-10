const { topics } = require("../topic/getTopics");

module.exports.transformSection = (section, authData, filter) => {
  return {
    ...section._doc,
    _id: section.id.toString(),
    topics: () => topics(section.topics, authData, filter),
  };
};
