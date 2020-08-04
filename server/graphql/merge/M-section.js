const Section = require("../../models/section");
const { topics } = require("./M-topic");

const singleSection = async (sectionId, authData, filter) => {
  try {
    const section = await Section.findById(sectionId);
    return transformSection(section, authData, filter);
  } catch (err) {
    throw err;
  }
};

const transformSection = (section, authData, filter) => {
  return {
    ...section._doc,
    _id: section.id.toString(),
    topics: () => topics(section.topics, authData, filter),
  };
};

exports.singleSection = singleSection;
exports.transformSection = transformSection;
