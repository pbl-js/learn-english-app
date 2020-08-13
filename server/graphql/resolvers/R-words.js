import Word from "../../models/word.js";
import Topic from "../../models/topic.js";
import transformWord from "../merge/word/transformWord.js";

export default {
  words: async () => {
    try {
      const words = await Word.find();

      return words.map((word) => {
        return transformWord(word);
      });
    } catch (err) {
      throw err;
    }
  },

  createWord: async (args, req) => {
    if (req.authData.accessLevel < 10 && req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const word = new Word({
        topic: args.wordInput.topic,
        img: args.wordInput.img,
        eng: args.wordInput.eng,
        pl: args.wordInput.pl,
      });

      const result = await word.save();

      const createdWord = transformWord(result);

      const topic = await Topic.findById(args.wordInput.topic);

      topic.words.push(result.id);
      topic.totalWords = topic.totalWords + 1;

      await topic.save();

      return createdWord;
    } catch (err) {
      throw err;
    }
  },
};