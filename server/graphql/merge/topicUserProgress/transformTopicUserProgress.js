// import singleTopic from "../topic/getSingleTopic.js";

export default (topicUserProgress, authData, filter) => {
  return {
    ...topicUserProgress._doc,
    _id: topicUserProgress.id.toString(),
    // topic: () => singleTopic(topicUserProgress._doc.topicId, authData, filter),
  };
};
