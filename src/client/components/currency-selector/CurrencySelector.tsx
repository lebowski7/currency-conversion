import React, { useEffect, useState } from "react";
import { ICurrency } from "~shared/types";
import "./CurrencySelector.scss";
import "currency-flags/dist/currency-flags.min.css";

interface IProps {
  currencies: ICurrency[];
  onChange: (value: string) => void;
  selected: string;
}

export const CurrencySelector = ({
  currencies,
  onChange,
  selected,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCurrencies, setFilteredCurrencies] = useState<ICurrency[]>(
    currencies
  );

  useEffect(() => {
    if (searchQuery) {
      setFilteredCurrencies(
        currencies.filter((currency) => {
          return (
            currency.code.toLowerCase().includes(searchQuery) ||
            currency.name.toLowerCase().includes(searchQuery)
          );
        })
      );
    } else {
      setFilteredCurrencies(currencies);
    }
  }, [searchQuery]);

  const closeOptions = () => {
    setSearchQuery("");
    setOpen(false);
  };

  return (
    <>
      <div
        className={`CurrencySelector  ${open ? "CurrencySelector--open" : ""}`}
      >
        <div
          className="CurrencySelector__option CurrencySelector__selected"
          onClick={() => setOpen(true)}
        >
          <div
            className={`currency-flag currency-flag-${selected.toLowerCase()}`}
          />
          <h3>{selected}</h3>
        </div>
        {open && (
          <div className="CurrencySelector__options">
            <input
              type="text"
              autoFocus
              placeholder="Search currency"
              className="CurrencySelector__search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
            {filteredCurrencies.map((currency) => (
              <div
                onClick={() => {
                  onChange(currency.code);
                  closeOptions();
                }}
                className="CurrencySelector__option"
                key={currency.code}
              >
                <div
                  className={`currency-flag currency-flag-${currency.code.toLowerCase()}`}
                />
                {currency.code} - {currency.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {open && (
        <div
          onClick={() => closeOptions()}
          className="CurrencySelector__overlay"
        />
      )}
    </>
  );
};
