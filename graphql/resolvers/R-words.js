import Word from "../../models/word.js";
import Topic from "../../models/topic.js";
import User from "../../models/user.js";
import WordUserProgress from "../../models/wordUserProgress.js";
import transformWord from "../merge/word/transformWord.js";
import accessLevel from "../../helpers/accessLevel.js";

export default {
  words: async (args, req) => {
    try {
      const words = await Word.find();

      return words.map((word) => {
        return transformWord(word, req.authData, args.filter);
      });
    } catch (err) {
      throw err;
    }
  },

  wordsByTopicId: async (args, req) => {
    try {
      const words = await Word.find({ topic: { $in: args.topicId } });

      return words.map((word) => {
        return transformWord(word, req.authData, args.filter);
      });
    } catch (err) {
      throw err;
    }
  },

  createWord: async (args, req) => {
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    if (req.authData.accessLevel < accessLevel.superAdmin) {
      throw new Error("To low access level!");
    }

    try {
      const word = new Word({
        topic: args.wordInput.topic,
        img: args.wordInput.img,
        eng: args.wordInput.eng,
        pl: args.wordInput.pl,
      });

      const result = await word.save();

      const createdWord = transformWord(result, req.authData, args.filter);

      // Update totalWords in topic
      const topic = await Topic.findById(args.wordInput.topic);
      topic.totalWords = topic.totalWords + 1;
      await topic.save();

      // Create wordUserProgress for all users
      const allUsers = await User.find();

      for (const user of allUsers) {
        const wordUserProgress = new WordUserProgress({
          userId: user.id,
          wordId: result.id,
        });

        await wordUserProgress.save();
      }

      return createdWord;
    } catch (err) {
      throw err;
    }
  },

  incrementWordProgress: async (args, req) => {
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const wordProgress = await WordUserProgress.findOne({
      userId: req.authData.userId,
      wordId: args.wordId,
    });

    const status = wordProgress.status;

    if (status === "unseen") {
      wordProgress.status = "learning";
    } else if (status === "learning") {
      wordProgress.learningProgress.value =
        wordProgress.learningProgress.value + 1;
      if (
        wordProgress.learningProgress.value ===
        wordProgress.learningProgress.total
      ) {
        wordProgress.status = "mastering";
      }
    } else if (status === "mastering") {
      wordProgress.masteringProgress.value++;
      if (
        wordProgress.masteringProgress.value ===
        wordProgress.masteringProgress.total
      ) {
        wordProgress.status = "complete";
      }
    }

    wordProgress.save();

    const word = await Word.findOne({
      _id: args.wordId,
    });

    const updatedWord = transformWord(word, req.authData, args.filter);

    return updatedWord;
  },

  resetWordProgressByWordId: async (args, req) => {
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const wordProgress = await WordUserProgress.findOne({
      userId: req.authData.userId,
      wordId: args.wordId,
    });

    wordProgress.status = "unseen";
    wordProgress.learningProgress.value = 0;
    wordProgress.masteringProgress.value = 0;

    wordProgress.save();

    const word = await Word.findOne({
      _id: args.wordId,
    });

    const updatedWord = transformWord(word, req.authData, args.filter);

    return updatedWord;
  },
};
