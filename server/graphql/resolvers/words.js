const Word = require("../../models/word");
const Topic = require("../../models/topic");
const { transformWord } = require("./merge");

module.exports = {
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

  createWord: async (args) => {
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