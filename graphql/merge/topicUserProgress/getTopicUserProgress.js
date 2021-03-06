import TopicUserProgress from "../../../models/topicUserProgress.js";
import transformTopicUserProgress from "./transformTopicUserProgress.js";

export default async (topicId, authData, filter) => {
  if (!authData.isAuth) {
    throw new Error("Unauthenticated fro userProgress!");
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
