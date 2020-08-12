import singleTopic from "../topic/getSingleTopic.js";

export default (word, authData, filter) => {
  return {
    ...word._doc,
    _id: word.id.toString(),
    topic: () => singleTopic(word._doc.topic, authData, filter),
  };
};
