const Topic = require("../../models/topic");
const { singleSection } = require("./M-section");
const { words } = require("./M-word");
const { topicUserProgress } = require("./M-topicUserProgress");

const topics = async (topicIds, authData, filter) => {
  try {
    const topics = await Topic.find({ _id: { $in: topicIds } });

    return topics.map((topic) => {
      return transformTopic(topic, authData, filter);
    });
  } catch (err) {
    throw err;
  }
};

const singleTopic = async (topicId, authData, filter) => {
  try {
    const topic = await Topic.findById(topicId);

    return transformTopic(topic, authData, filter);
  } catch (err) {
    throw err;
  }
};

const transformTopic = (topic, authData, filter) => {
  return {
    ...topic._doc,
    _id: topic.id.toString(),
    section: () => singleSection(topic._doc.section, authData, filter),
    words: () => words(topic._doc.words, authData, filter),
    progress: () => topicUserProgress(topic.id, authData, filter),
  };
};

exports.singleTopic = singleTopic;
exports.topics = topics;
exports.transformTopic = transformTopic;
