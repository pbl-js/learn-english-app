const { buildSchema } = require("graphql");

// totalWords: Int!
// words: [Word!]!

module.exports = buildSchema(`
type Progress {
  value: Int!
  total: Int!
}
type Section {
  _id: ID!
  title: String!
  color: String!
  topics: [Topic!]!
}

type Topic {
  _id: ID!
  section: Section!
  title: String!
  img: String!
  words: [Word!]!
  progress: TopicUserProgress!
}

type TopicUserProgress {
  topic: Topic!
  unlock: Boolean!
  started: Boolean!
  passed: Boolean!
  mastering: Boolean!
  learningValue: Int!
  learningTotal: Int!
  masteringValue: Int!
  masteringTotal: Int!
}

type Word {
  _id: ID!
  topic: Topic!
  img: String!
  eng: String!
  pl: String!
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
    singleTopic(topicId: ID!): Topic
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createSection(sectionInput: SectionInput): Section!
  createTopic(topicInput: TopicInput): Topic!
  createWord(wordInput: WordInput): Word!
  createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
