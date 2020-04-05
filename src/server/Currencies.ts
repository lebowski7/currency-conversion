import { ICurrency } from "../types";

const currenciesObject = require("./data/currencies.json");

class Currencies {
  public currencies: ICurrency[] = [];

  constructor() {
    this.currencies = Object.entries(currenciesObject).map(
      ([key, value]: [string, string]) => ({
        code: key,
        name: value,
      })
    );
  }

  getAll() {
    return this.currencies;
  }

  getOne(code: string) {
    return this.currencies.find((currency) => currency.code === code);
  }
}

export default new Currencies();
