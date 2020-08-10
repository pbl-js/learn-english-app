const TopicUserProgress = require("../../../models/topicUserProgress");
const transformTopicUserProgress = require("./transformTopicUserProgress");

module.exports.topicUserProgress = async (topicId, authData, filter) => {
  if (!authData.isAuth) {
    throw new Error("Unauthenticated!");
  }

  try {
    const topicUserProgress = await TopicUserProgress.findOne({
      userId: { $in: authData.userId },
      topicId: { $in: topicId },
    });

    return transformTopicUserProgress(topicUserProgress, authData, filter);
  } catch (err) {
    throw err;
  }
};
