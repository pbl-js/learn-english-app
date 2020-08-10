const Section = require("../../models/section");
const transformSection = require("../merge/section/transformSection");

module.exports = {
  sections: async (args, req) => {
    try {
      const sections = await Section.find();

      return sections.map((section) => {
        return transformSection(section, req.authData, args.filter);
      });
    } catch (err) {
      throw err;
    }
  },

  createSection: async (args, req) => {
    if (req.authData.accessLevel < 10 && req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

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
