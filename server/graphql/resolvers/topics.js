const Topic = require("../../models/topic");
const { transformTopic } = require("./merge");

module.exports = {
  topics: async () => {
    try {
      const topics = await Topic.find();

      return topics.map((topic) => {
        return transformTopic(topic);
      });
    } catch (err) {
      throw err;
    }
  },

  createTopic: async (args) => {
    const topic = new Topic({
      section: args.topicInput.section,
      title: args.topicInput.title,
      img: args.topicInput.img,
    });

    try {
      const result = await topic.save();
      console.log(result);

      const createdTopic = transformTopic(result);
      console.log(createdTopic);

      return createdTopic;
    } catch (err) {
      throw err;
    }
  },
};
