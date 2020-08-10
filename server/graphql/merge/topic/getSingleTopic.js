const Topic = require("../../../models/topic");
const transformTopic = require("./transformTopic");

module.exports.singleTopic = async (topicId, authData, filter) => {
  try {
    const topic = await Topic.findById(topicId);

    return transformTopic(topic, authData, filter);
  } catch (err) {
    throw err;
  }
};
