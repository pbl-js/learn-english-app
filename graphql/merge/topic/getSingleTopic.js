import Topic from "../../../models/topic.js";
import transformTopic from "./transformTopic.js";

export default async (topicId, authData, filter) => {
  try {
    const topic = await Topic.findById(topicId);

    return transformTopic(topic, authData, filter);
  } catch (err) {
    throw err;
  }
};
