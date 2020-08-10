const singleSection = require("../section/getSingleSection");
const words = require("../word/getWords");
const topicUserProgress = require("../topicUserProgress/getTopicUserProgress");

module.exports.transformTopic = (topic, authData, filter) => {
  return {
    ...topic._doc,
    _id: topic.id.toString(),
    section: () => singleSection(topic._doc.section, authData, filter),
    words: () => words(topic._doc.words, authData, filter),
    progress: () => topicUserProgress(topic.id, authData, filter),
  };
};
