const TopicUserProgress = require("../../models/topicUserProgress");
const { singleTopic } = require("./topic");

const topicUserProgress = async ({ topicId, isAuth, userId }) => {
  if (!isAuth) {
    throw new Error("Unauthenticated!");
  }

  try {
    const topicUserProgress = await TopicUserProgress.findOne({
      userId: { $in: userId },
      topicId: { $in: topicId },
    });
    return transformTopicUserProgress(topicUserProgress);
  } catch (err) {
    throw err;
  }
};

const transformTopicUserProgress = (topic) => {
  return {
    ...topic._doc,
    _id: topic.id.toString(),
    topic: () => singleTopic(topic._doc.topic),
  };
};

exports.topicUserProgress = topicUserProgress;
exports.transformTopicUserProgress = transformTopicUserProgress;
