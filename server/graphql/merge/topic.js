const Topic = require("../../models/topic");
const { singleSection } = require("./section");
const { words } = require("./word");
const { topicUserProgress } = require("./topicUserProgress");

const topics = async (topicIds) => {
  try {
    const topics = await Topic.find({ _id: { $in: topicIds } });

    return topics.map((topic) => {
      return transformTopic(topic);
    });
  } catch (err) {
    throw err;
  }
};

const singleTopic = async (topicId) => {
  try {
    const topic = await Topic.findById(topicId);

    return transformTopic(topic);
  } catch (err) {
    throw err;
  }
};

const transformTopic = ({ topic, isAuth, userId }) => {
  return {
    ...topic._doc,
    _id: topic.id.toString(),
    section: () => singleSection(topic._doc.section),
    words: () => words(topic._doc.words),
    progress: () => topicUserProgress({ topicId: topic.id, isAuth, userId }),
  };
};

exports.topics = topics;
exports.singleTopic = singleTopic;
exports.transformTopic = transformTopic;
