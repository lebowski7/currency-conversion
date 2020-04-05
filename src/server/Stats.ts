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
  const {
    destinationCurrencies,
    totalUSDConverted,
    totalConversionRequests,
  } = getStats();
  const selectedCurrency = destinationCurrencies.find(
    (c) => c.code === destinationCurrency
  );
  if (selectedCurrency) {
    selectedCurrency.popularity = selectedCurrency.popularity + 1;
  } else {
    destinationCurrencies.push({
      code: destinationCurrency,
      popularity: 1,
    });
  }
  return db
    .get("stats")
    .assign({
      destinationCurrencies: destinationCurrencies.sort((a, b) =>
        a.popularity < b.popularity ? 1 : -1
      ),
      totalUSDConverted: totalUSDConverted + USDAddition,
      totalConversionRequests: totalConversionRequests + 1,
    })
    .write();
};
