import pkg from "graphql";

const { buildSchema } = pkg;

const schema = buildSchema(`
type Progress {
  value: Int!
  total: Int!
}

type Section {
  _id: ID!
  title: String!
  color: String!
}

type Topic {
  _id: ID!
  section: Section!
  title: String!
  img: String!
  totalWords: Int!
  defaultStatus: String!
  progress: TopicUserProgress!
}

type TopicUserProgress {
  topic: Topic!
  status: String!
  learningProgress: Progress!
  masteringProgress: Progress!
}

type Word {
  _id: ID!
  topic: Topic!
  img: String!
  eng: String!
  pl: String!
  progress: WordUserProgress!
}

type WordUserProgress {
  word: Word!
  topic: Topic!
  status: String!
  learningProgress: Progress!
  masteringProgress: Progress!
}

type User {
  _id: ID!
  email: String!
  password: String
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
}

input SectionInput {
  title: String!
  color: String!
}

input TopicInput {
  title: String!
  section: ID!
  img: String!
  defaultStatus: String
}

input WordInput {
  topic: ID!
  img: String!
  eng: String!
  pl: String!
}

type RootQuery {
    sections: [Section!]!
    topics: [Topic!]!
    topicsUserProgress: [TopicUserProgress!]!
    words: [Word!]!
    wordsByTopicId(topicId: String!): [Word!]!
    singleTopic(topicId: ID!): Topic
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createSection(sectionInput: SectionInput): Section!
  createTopic(topicInput: TopicInput): Topic!
  createWord(wordInput: WordInput): Word!
  createUser(userInput: UserInput): User
  incrementWordProgress(wordId: ID!): Word!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

export default schema;
