const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("src/server/data/database.json");
export const db = low(adapter);

if (!db.has("stats").value()) {
  db.defaults({
    stats: {
      destinationCurrencies: [],
      totalUSDConverted: 0,
      totalConversionRequests: 0,
    },
  }).write();
}

export const getStats = () => {
  return db.get("stats").value();
};

export const updateStats = (
  USDAddition: number,
  destinationCurrency: string
) => {
  const currentStats = getStats();

  const destinationCurrencies = [...currentStats.destinationCurrencies];
  const selectedCurrency = destinationCurrencies.find(
    (currency) => currency.code === destinationCurrency
  );
  if (selectedCurrency) {
    selectedCurrency.popularity = selectedCurrency.popularity + 1;
  } else {
    destinationCurrencies.push({
      code: destinationCurrency,
      popularity: 1,
    });
  }

  destinationCurrencies.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));

  const newStats = {
    destinationCurrencies: destinationCurrencies,
    totalUSDConverted: currentStats.totalUSDConverted + USDAddition,
    totalConversionRequests: currentStats.totalConversionRequests + 1,
  };
  return db.get("stats").assign(newStats).write();
};
