import fetch from "node-fetch";
import { CURRENCY_APP_ID } from "../config";
import { updateStats } from "./Stats";

export const conversion = async (fromCurrency, destinationCurrency, amount) => {
  const response = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${CURRENCY_APP_ID}&base=USD&symbols=USD,${fromCurrency},${destinationCurrency}`
  );
  const { rates } = await response.json();
  const totalUSD = (rates.USD / rates[fromCurrency]) * amount;
  await updateStats(totalUSD, destinationCurrency);
  return (rates[destinationCurrency] / rates[fromCurrency]) * amount;
};
