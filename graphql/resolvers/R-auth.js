import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import Topic from "../../models/topic.js";
import TopicUserProgress from "../../models/topicUserProgress.js";
import Word from "../../models/word.js";
import WordUserProgress from "../../models/wordUserProgress.js";

export default {
  createUser: async (args) => {
    try {
      const userExist = await User.findOne({ email: args.userInput.email });

      if (userExist) {
        throw new Error("User exists already");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      // Create topicUserProgress for all topics
      const allTopics = await Topic.find();

      for (const topic of allTopics) {
        const topicUserProgress = new TopicUserProgress({
          userId: result.id,
          topicId: topic.id,
          status: topic.defaultStatus,
          learningProgress: {
            value: 0,
            total: topic.totalWords,
          },
          masteringProgress: {
            value: 0,
            total: topic.totalWords,
          },
        });

        await topicUserProgress.save();
      }

      // Create wordUserProgress for all words
      const allWords = await Word.find();

      for (const word of allWords) {
        const wordUserProgress = new WordUserProgress({
          userId: result.id,
          wordId: word.id,
        });

        await wordUserProgress.save();
      }

      // GraphQL resault
      return {
        ...result._doc,
        password: null,
        _id: result.id,
      };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist!");
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, accessLevel: user.accessLevel },
      "somesupersecretkey",
      {
        expiresIn: "1hr",
      }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
