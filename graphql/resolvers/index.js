import SectionsResolver from "./R-sections.js";
import TopicsResolver from "./R-topics.js";
import WordsResolver from "./R-words.js";
// import TopicsUserProgress from "./R-topicsUserProgress.js";
import AuthResolver from "./R-auth.js";

const rootResolver = {
  ...AuthResolver,
  ...SectionsResolver,
  ...TopicsResolver,
  ...WordsResolver,
  // ...TopicsUserProgress,
};

export default rootResolver;
