const Topic = require("../../models/topic");
const Section = require("../../models/section");

const TopicUserProgress = require("../../models/topicUserProgress");
const { transformTopicUserProgress } = require("../merge/topicUserProgress");

module.exports = {
  topicsUserProgress: async () => {
    try {
      const topicsUserProgress = await TopicUserProgress.find({
        userId: { $in: "mlecznyUser" },
      });

      return topicsUserProgress.map((topicUserProgress) => {
        return transformTopicUserProgress(topicUserProgress);
      });
    } catch (err) {
      throw err;
    }
  },

  //   singleTopic: async (args) => {
  //     try {
  //       const topic = await Topic.findById(args.topicId);
  //       console.log(topic);

  //       return transformTopic(topic);
  //     } catch (err) {
  //       throw err;
  //     }
  //   },

  //   createTopicUserProgress: async (args) => {
  //     const topicUserProgress = new Topic({
  //       userId: "mlecznyUser",
  //         topicId: args.userID
  //     });

  //     try {
  //       const result = await topic.save();

  //       const createdTopic = transformTopic(result);

  //       const section = await Section.findById(args.topicInput.section);

  //       section.topics.push(result.id);

  //       await section.save();

  //       return createdTopic;
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
};
