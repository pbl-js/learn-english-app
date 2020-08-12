import singleSection from "../section/getSingleSection.js";

export default (topic, authData, filter) => {
  return {
    ...topic._doc,
    _id: topic.id.toString(),
    section: () => singleSection(topic._doc.section, authData, filter),
  };
};
