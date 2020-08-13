import Section from "../../models/section.js";
import transformSection from "../merge/section/transformSection.js";
import accessLevel from "../../helpers/accessLevel.js";

export default {
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
    if (!req.authData.isAuth) {
      throw new Error("Unauthenticated!");
    }

    if (req.authData.accessLevel < accessLevel.superAdmin) {
      throw new Error("To low access level!");
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
