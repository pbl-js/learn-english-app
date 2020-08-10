const singleTopic = require("../topic/getSingleTopic");

module.exports.transformTopicUserProgress = (
  topicUserProgress,
  authData,
  filter
) => {
  return {
    ...topicUserProgress._doc,
    _id: topicUserProgress.id.toString(),
    topic: () => singleTopic(topicUserProgress._doc.topicId, authData, filter),
  };
};
