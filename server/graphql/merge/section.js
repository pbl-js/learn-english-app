const Section = require("../../models/section");
const { topics } = require("./topic");

const singleSection = async (sectionId) => {
  try {
    const section = await Section.findById(sectionId);
    return transformSection(section);
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

exports.singleSection = singleSection;
exports.transformSection = transformSection;
