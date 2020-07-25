const Section = require("../../models/section");
const Topic = require("../../models/topic");
const Word = require("../../models/word");

const singleSection = async (sectionId) => {
  try {
    const section = await Section.findById(sectionId);
    return transformSection(section);
  } catch (err) {
    throw err;
  }
};

const topics = async (topicIds) => {
  try {
    const topics = await Topic.find({ _id: { $in: topicIds } });

    return topics.map((topic) => {
      return transformTopic(topic);
    });
  } catch (err) {
    throw err;
  }
};

const singleTopic = async (topicId) => {
  try {
    const topic = await Topic.findById(topicId);

    return transformTopic(topic);
  } catch (err) {
    throw err;
  }
};

const transformSection = (section) => {
  return {
    ...section._doc,
    _id: section.id.toString(),
    topics: () => topics(section.topics),
  };
};

const transformTopic = (topic) => {
  return {
    ...topic._doc,
    _id: topic.id.toString(),
    section: () => singleSection(topic._doc.section),
  };
};

const transformWord = (word) => {
  return {
    ...word._doc,
    _id: word.id.toString(),
    topic: () => singleTopic(word._doc.topic),
  };
};

exports.transformSection = transformSection;
exports.transformTopic = transformTopic;
exports.transformWord = transformWord;
