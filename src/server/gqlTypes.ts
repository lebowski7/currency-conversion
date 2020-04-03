const { gql } = require("apollo-server-express");

export const typeDefs = gql`
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
