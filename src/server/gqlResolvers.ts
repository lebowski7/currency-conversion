import Currencies from "./CurrenciesModel";
import { ConversionModel } from "./ConversionModel";
import { getStats } from "./StatsService";

export const resolvers = {
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
