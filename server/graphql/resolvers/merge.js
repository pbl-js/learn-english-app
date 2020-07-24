const transformSection = (section) => {
  return {
    ...section._doc,
    _id: section.id.toString(),
  };
};

exports.transformSection = transformSection;
