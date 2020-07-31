const TopicUserProgress = require("../../models/topicUserProgress");
const { transformTopicUserProgress } = require("../merge/topicUserProgress");

module.exports = {
  topicsUserProgress: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const topicsUserProgress = await TopicUserProgress.find({
        userId: { $in: req.userId },
      });

      return topicsUserProgress.map((topicUserProgress) => {
        return transformTopicUserProgress(topicUserProgress);
      });
    } catch (err) {
      throw err;
    }
  },
};
