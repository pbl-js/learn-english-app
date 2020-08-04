const Word = require("../../models/word");
const { singleTopic } = require("./M-topic");

const words = async (wordIds, authData, filter) => {
  try {
    const words = await Word.find({ _id: { $in: wordIds } });

    return words.map((word) => {
      return transformWord(word);
    });
  } catch (err) {
    throw err;
  }
};

const transformWord = (word, authData, filter) => {
  return {
    ...word._doc,
    _id: word.id.toString(),
    topic: () => singleTopic(word._doc.topic, authData, filter),
  };
};

exports.words = words;
exports.transformWord = transformWord;
