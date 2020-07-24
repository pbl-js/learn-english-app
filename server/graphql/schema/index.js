const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
  words: [Word!]!
}

type Word {
  _id: ID!
  section: Section!
  img: String!
  topic: Topic!
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

type RootQuery {
    sections: [Section!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createSection(sectionInput: SectionInput): Section!
  createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
