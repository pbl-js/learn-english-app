const Topic = require("../../models/topic");
const Section = require("../../models/section");
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

  singleTopic: async (args) => {
    try {
      const topic = await Topic.findById(args.topicId);
      console.log(topic);

      return transformTopic(topic);
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

      const createdTopic = transformTopic(result);

      const section = await Section.findById(args.topicInput.section);

      section.topics.push(result.id);

      await section.save();

      return createdTopic;
    } catch (err) {
      throw err;
    }
  },
};
