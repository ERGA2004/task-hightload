const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Task {
    id: ID!
    title: String!
    description: String
    deadlineDate: String
    status: String
    userId: ID!
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    createTask(title: String!, description: String, deadlineDate: String, status: String, userId: ID!): Task
  }
`);
