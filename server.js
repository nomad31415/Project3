// load environment properties from a .env file for local development
require('dotenv').load({ silent: true });
const app = require('./app.js');

const port = process.env.PORT || 3002;




app
.use(
    '/graphql',
    expressGraphQL({
      schema,
      rootValue: resolvers,
      graphiql: true,
    })
).listen(port);
console.log('listening at:', port); // eslint-disable-line
