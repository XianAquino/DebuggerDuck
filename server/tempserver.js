const express = require('express');
const app = express();
const port = 4044;
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema.js');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
