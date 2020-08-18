// import TopicUserProgress from "../../models/topicUserProgress.js";
// import transformTopicUserProgress from "../merge/topicUserProgress/transformTopicUserProgress.js";

// export default {
//   topicsUserProgress: async (args, req) => {
//     if (!req.authData.isAuth) {
//       throw new Error("Unauthenticated!");
//     }

//     try {
//       const topicsUserProgress = await TopicUserProgress.find({
//         userId: { $in: req.authData.userId },
//       });

//       return topicsUserProgress.map((topicUserProgress) => {
//         return transformTopicUserProgress(
//           topicUserProgress,
//           req.authData,
//           args.filter
//         );
//       });
//     } catch (err) {
//       throw err;
//     }
//   },
// };
