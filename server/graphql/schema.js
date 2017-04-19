const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const query = require('./query');

const schema = new GraphQLSchema({
  query
});

module.exports = schema;
