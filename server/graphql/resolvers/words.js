const Word = require("../../models/word");
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
      console.log(createdWord);

      return createdWord;
    } catch (err) {
      throw err;
    }
  },

  //   createSection: async (args) => {
  //     const section = new Section({
  //       title: args.sectionInput.title,
  //       color: args.sectionInput.color,
  //     });

  //     try {
  //       const result = await section.save();

  //       const createdSection = transformSection(result);

  //       return createdSection;
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
};
