const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type Comment {
    postId: Int
    id: Int
    name: String
    email: String
    body: String
  }

  type Query {
    posts: [Post]
    comments: [Comment]
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response?.data;
    },
    comments: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
      return response?.data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
