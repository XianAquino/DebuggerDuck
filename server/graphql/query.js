const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;
const db = require('../db/schemas');
const userType = require('./types/user');

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'food runner query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, args) => {
        return db.User.findOne({_id: args.id});
      }
    }
  }
});

module.exports = query;
