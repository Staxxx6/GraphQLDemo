const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')


const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote
}

// schema.graphql defines the GraphQl schema
// resolvers is the actual implementation of the GraphQL schema. Handles what will be returned as an answer to the query
const resolvers = {
  Query: {
    info: () => "This is the API of Hackernews Clone",
    // i don't need Link resolvers because Graph!l server infers what they look like
  },
  Mutation: {
    post: (parent, args) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

// tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs: "schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running`));
