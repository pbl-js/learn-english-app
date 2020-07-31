const Section = require("../../models/section");
const { transformSection } = require("../merge/section");

module.exports = {
  sections: async () => {
    try {
      const sections = await Section.find();

      return sections.map((section) => {
        return transformSection(section);
      });
    } catch (err) {
      throw err;
    }
  },

  createSection: async (args) => {
    const section = new Section({
      title: args.sectionInput.title,
      color: args.sectionInput.color,
    });

    try {
      const result = await section.save();

      const createdSection = transformSection(result);

      return createdSection;
    } catch (err) {
      throw err;
    }
  },
};
