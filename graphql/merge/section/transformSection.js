export default (section, authData, filter) => {
  return {
    ...section._doc,
    _id: section.id.toString(),
  };
};
