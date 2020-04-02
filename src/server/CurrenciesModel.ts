import { ICurrency } from "~shared/types";

const currenciesObject = require("./data/currencies.json");

class CurrenciesModel {
  public currencies: ICurrency[] = [];

  constructor() {
    this.currencies = Object.keys(currenciesObject).map((currency) => {
      return {
        code: currency,
        name: currenciesObject[currency],
      };
    });
  }

  getAll() {
    return this.currencies;
  }

  getOne(code: string) {
    return this.currencies.find((currency) => currency.code === code);
  }
}

export default new CurrenciesModel();
