import Topic from "../../../models/topic.js";
import { transformTopic } from "./transformTopic.js";

export default topics = async (topicIds, authData, filter) => {
  try {
    const topics = await Topic.find({ _id: { $in: topicIds } });

    return topics.map((topic) => {
      return transformTopic(topic, authData, filter);
    });
  } catch (err) {
    throw err;
  }
};
