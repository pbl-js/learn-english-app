import Word from "../../../models/word.js";
import transformWord from "./transformWord.js";

export default words = async (wordIds, authData, filter) => {
  try {
    const words = await Word.find({ _id: { $in: wordIds } });

    return words.map((word) => {
      return transformWord(word);
    });
  } catch (err) {
    throw err;
  }
};
