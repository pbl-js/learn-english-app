import Section from "../../../models/section.js";
import transformSection from "./transformSection.js";

export default async (sectionId, authData, filter) => {
  try {
    const section = await Section.findById(sectionId);
    return transformSection(section, authData, filter);
  } catch (err) {
    throw err;
  }
};
