const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    testQuery: String
  }
`);

module.exports = schema;
