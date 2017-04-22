const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;
const userType = require('./types/user');
const User = require('../models/user');

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
        return User.getInfo()
      }
    }
  }
});

module.exports = query;
