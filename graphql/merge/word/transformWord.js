import singleTopic from "../topic/getSingleTopic.js";
import getWordUserProgress from "../wordUserProgress/getWordUserProgress.js";

export default (word, authData, filter) => {
  return {
    ...word._doc,
    _id: word.id.toString(),
    topic: () => singleTopic(word._doc.topic, authData, filter),
    progress: () => getWordUserProgress(word.id, authData, filter),
  };
};
