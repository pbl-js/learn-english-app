const Topic = require("../../../models/topic");
const transformTopic = require("./transformTopic");

module.exports.topics = async (topicIds, authData, filter) => {
  try {
    const topics = await Topic.find({ _id: { $in: topicIds } });

    return topics.map((topic) => {
      return transformTopic(topic, authData, filter);
    });
  } catch (err) {
    throw err;
  }
};
