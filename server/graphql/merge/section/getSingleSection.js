const Section = require("../../../models/section");
const transformSection = require("./transformSection");

module.exports.singleSection = async (sectionId, authData, filter) => {
  try {
    const section = await Section.findById(sectionId);
    return transformSection(section, authData, filter);
  } catch (err) {
    throw err;
  }
};
