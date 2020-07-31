const Word = require("../../models/word");
const { singleTopic } = require("./topic");

const words = async (wordIds) => {
  try {
    const words = await Word.find({ _id: { $in: wordIds } });

    return words.map((word) => {
      return transformWord(word);
    });
  } catch (err) {
    throw err;
  }
};

const transformWord = (word) => {
  return {
    ...word._doc,
    _id: word.id.toString(),
    topic: () => singleTopic(word._doc.topic),
  };
};

exports.words = words;
exports.transformWord = transformWord;
