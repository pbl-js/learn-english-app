const Topic = require("../../models/topic");
const Section = require("../../models/section");
const TopicUserProgress = require("../../models/topicUserProgress");
const { transformTopic } = require("./merge");

const testUser = "5f1ebe5b9611697161dd7f25";

module.exports = {
  topics: async () => {
    try {
      const topics = await Topic.find();

      return topics.map((topic) => {
        return transformTopic(topic, testUser);
      });
    } catch (err) {
      throw err;
    }
  },

  singleTopic: async (args) => {
    try {
      const topic = await Topic.findById(args.topicId);

      return transformTopic(topic, testUser);
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

      // Add relation to section
      const section = await Section.findById(args.topicInput.section);
      section.topics.push(result.id);
      await section.save();

      // Generate new topicUserProgress
      const topicUserProgress = new TopicUserProgress({
        userId: testUser,
        topicId: result.id,
        learningTotal: 100,
        masteringTotal: 100,
      });

      await topicUserProgress.save();

      return createdTopic;
    } catch (err) {
      throw err;
    }
  },
};
