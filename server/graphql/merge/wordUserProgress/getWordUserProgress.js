import WordUserProgress from "../../../models/wordUserProgress.js";
import transformWordUserProgress from "./transformWordUserProgress.js";

export default async (wordId, authData, filter) => {
  if (!authData.isAuth) {
    throw new Error("Unauthenticated fro userProgress!");
  }

  try {
    const wordUserProgress = await WordUserProgress.findOne({
      userId: { $in: authData.userId },
      wordId: { $in: wordId },
    });

    return transformWordUserProgress(wordUserProgress, authData, filter);
  } catch (err) {
    throw err;
  }
};
