const Word = require("../../../models/word");
const transformWord = require("./transformWord");

module.exports.words = async (wordIds, authData, filter) => {
  try {
    const words = await Word.find({ _id: { $in: wordIds } });

    return words.map((word) => {
      return transformWord(word);
    });
  } catch (err) {
    throw err;
  }
};
