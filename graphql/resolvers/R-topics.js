import Topic from "../../models/topic.js";
import User from "../../models/user.js";
import TopicUserProgress from "../../models/topicUserProgress.js";
import transformTopic from "../../graphql/merge/topic/transformTopic.js";
import accessLevel from "../../helpers/accessLevel.js";
import WordUserProgress from "../../models/wordUserProgress.js";
import Word from "../../models/word.js";
import transformWord from "../merge/word/transformWord.js";

export default {
  topics: async (args, req) => {
    try {
      const topics = await Topic.find();

      return topics.map((topic) => {
        return transformTopic(topic, req.authData, args.filter);
      });
    } catch (err) {
      throw err;
    }
  },

  singleTopic: async (args, req) => {
    try {
      const topic = await Topic.findById(args.topicId);

      return transformTopic(topic, req.authData, args.filter);
    } catch (err) {
      throw err;
    }
  },

  topicsOnlyWithProgress: async (args, req) => {
    try {
      const topicsProgress = await TopicUserProgress.find({
        userId: req.authData.userId,
        status: { $in: ["learning", "mastering", "completed"] },
      });

      const ids = topicsProgress.map((item) => item.topicId);

      const topics = await Topic.find({
        _id: { $in: ids },
      });

      return topics.map((topic) => transformTopic(topic, req.authData));
    } catch (err) {
      throw err;
    }
  },

  createTopic: async (args, req) => {
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    if (req.authData.accessLevel < accessLevel.superAdmin) {
      throw new Error("To low access level!");
    }

    const topic = new Topic({
      section: args.topicInput.section,
      title: args.topicInput.title,
      img: args.topicInput.img,
      defaultStatus: args.topicInput.defaultStatus,
    });

    try {
      const result = await topic.save();

      const createdTopic = transformTopic(result, req.authData, args.filter);

      // Generate new topicUserProgress for all users
      const allUsers = await User.find();

      for (const user of allUsers) {
        const topicUserProgress = new TopicUserProgress({
          userId: user.id,
          topicId: result.id,
          status: result.defaultStatus,
          learningProgress: {
            value: 0,
            total: 0,
          },
          masteringProgress: {
            value: 0,
            total: 0,
          },
        });

        await topicUserProgress.save();
      }
      // GraphQL return
      return createdTopic;
    } catch (err) {
      throw err;
    }
  },

  incrementTopicProgress: async (args, req) => {
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const topicProgress = await TopicUserProgress.findOne({
      userId: req.authData.userId,
      topicId: args.topicId,
    });

    const topicStatus = topicProgress.status;

    if (topicStatus === "normal") {
      topicProgress.status = "learning";
      topicProgress.learningProgress.value = 1;
    } else if (topicStatus === "learning") {
      if (
        topicProgress.learningProgress.value ===
        topicProgress.learningProgress.total
      ) {
        topicProgress.status = "mastering";
        topicProgress.masteringProgress.value = 1;
      } else {
        topicProgress.learningProgress.value =
          topicProgress.learningProgress.value + 1;
      }
    } else if (topicStatus === "mastering") {
      if (
        topicProgress.masteringProgress.value ===
        topicProgress.masteringProgress.total
      ) {
        topicProgress.status = "complete";
      } else {
        topicProgress.masteringProgress.value =
          topicProgress.masteringProgress.value + 1;
      }
    }

    topicProgress.save();

    const topic = await Topic.findOne({
      _id: args.topicId,
    });

    return transformTopic(topic, req.authData, args.filter);
  },

  resetTopicProgress: async (args, req) => {
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const topicProgress = await TopicUserProgress.findOne({
      userId: req.authData.userId,
      topicId: args.topicId,
    });

    topicProgress.status = "normal";
    topicProgress.learningProgress.value = 0;
    topicProgress.masteringProgress.value = 0;

    topicProgress.save();

    const topic = await Topic.findOne({
      _id: args.topicId,
    });

    const updatedTopic = transformTopic(topic, req.authData, args.filter);

    // Reset wordsProgress
    const words = await Word.find({ topic: args.topicId });

    const wordIds = words.map((word) => word._id);
    const wordsProgress = await WordUserProgress.find({
      wordId: wordIds,
      userId: req.authData.userId,
    });

    wordsProgress.forEach((progressItem) => {
      progressItem.status = "unseen";
      progressItem.learningProgress.value = 0;
      progressItem.masteringProgress.value = 0;

      progressItem.save();
    });

    const updatedWords = words.map((word) => {
      return transformWord(word, req.authData);
    });

    return {
      topic: updatedTopic,
      words: updatedWords,
    };
  },
};
