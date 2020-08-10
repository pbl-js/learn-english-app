const singleTopic = require("../topic/getSingleTopic");

module.exports.transformWord = (word, authData, filter) => {
  return {
    ...word._doc,
    _id: word.id.toString(),
    topic: () => singleTopic(word._doc.topic, authData, filter),
  };
};
