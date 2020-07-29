const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Topic = require("../../models/topic");
const TopicUserProgress = require("../../models/topicUserProgress");

module.exports = {
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
          learningTotal: 100,
          masteringTotal: 100,
        });

        await topicUserProgress.save();
      }

      // GraphQL resault
      return { ...result._doc, password: null, _id: result.id };
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
      { userId: user.id, email: user.email },
      "somesupersecretkey",
      {
        expiresIn: "1hr",
      }
    );

    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};
