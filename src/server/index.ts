const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
import Currencies from "./CurrenciesModel";
import { ConversionModel } from "./ConversionModel";
import { getStats } from "./StatsService";

const PORT = 4000;

const app = express();

const typeDefs = gql`
  type Query {
    currencies: [Currency]
    currency(code: String!): Currency
    conversion(
      fromCurrency: String!
      destinationCurrency: String!
      amount: Float!
    ): Float
    stats: Stats
  }
  type Currency {
    code: String!
    name: String!
  }
  type CurrencyStats {
    code: String!
    popularity: Int!
  }
  type Stats {
    destinationCurrencies: [CurrencyStats]!
    totalUSDConverted: Float!
    totalConversionRequests: Int!
  }
`;

const resolvers = {
  Query: {
    currencies: () => Currencies.getAll(),
    currency: (_, { code }) => Currencies.getOne(code),
    conversion: (_, { fromCurrency, destinationCurrency, amount }) => {
      const Conversion = new ConversionModel(
        fromCurrency,
        destinationCurrency,
        amount
      );
      return Conversion.convert();
    },
    stats: () => getStats(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
