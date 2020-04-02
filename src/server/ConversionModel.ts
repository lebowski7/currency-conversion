import { updateStats } from "./StatsService";

const ratesObject = require("./data/rates.json");

export class ConversionModel {
  fromCurrency: string;
  destinationCurrency: string;
  amount: number;

  constructor(
    fromCurrency: string,
    destinationCurrency: string,
    amount: number
  ) {
    this.fromCurrency = fromCurrency;
    this.destinationCurrency = destinationCurrency;
    this.amount = amount;
  }

  async convert() {
    const { rates } = ratesObject;
    const baseRate = rates[ratesObject.base] / rates[this.fromCurrency];
    const totalUSD = baseRate * this.amount;
    await updateStats(totalUSD, this.destinationCurrency);
    return baseRate * rates[this.destinationCurrency] * this.amount;
  }
}
