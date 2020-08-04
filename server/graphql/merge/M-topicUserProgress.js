const TopicUserProgress = require("../../models/topicUserProgress");
const { singleTopic } = require("./M-topic");

const topicUserProgress = async (topicId, authData, filter) => {
  if (!authData.isAuth) {
    throw new Error("Unauthenticated!");
  }

  try {
    const topicUserProgress = await TopicUserProgress.findOne({
      userId: { $in: authData.userId },
      topicId: { $in: topicId },
    });

    console.log(singleTopic);
    return transformTopicUserProgress(topicUserProgress, authData, filter);
  } catch (err) {
    throw err;
  }
};

const transformTopicUserProgress = (topicUserProgress, authData, filter) => {
  return {
    ...topicUserProgress._doc,
    _id: topicUserProgress.id.toString(),
    topic: () => singleTopic(topicUserProgress._doc.topicId, authData, filter),
  };
};

exports.topicUserProgress = topicUserProgress;
exports.transformTopicUserProgress = transformTopicUserProgress;
