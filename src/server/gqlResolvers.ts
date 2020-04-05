import Currencies from "./Currencies";
import { conversion } from "./Conversion";
import { getStats } from "./Stats";

export const resolvers = {
  Query: {
    currencies: () => Currencies.getAll(),
    currency: (_, { code }) => Currencies.getOne(code),
    conversion: (_, { fromCurrency, destinationCurrency, amount }) => {
      return conversion(fromCurrency, destinationCurrency, amount);
    },
    stats: () => getStats(),
  },
};
