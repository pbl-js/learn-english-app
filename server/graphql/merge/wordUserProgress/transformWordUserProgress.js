export default (wordUserProgress, authData, filter) => {
  return {
    ...wordUserProgress._doc,
    _id: wordUserProgress.id.toString(),
  };
};
