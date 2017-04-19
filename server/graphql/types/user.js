const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    picture: { type: GraphQLString },
    karma: { type: GraphQLInt }
  }
});

module.exports = userType;
