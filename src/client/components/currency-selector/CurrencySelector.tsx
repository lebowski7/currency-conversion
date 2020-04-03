import React, { useState } from "react";
import { ICurrency } from "~shared/types";
import "./CurrencySelector.scss";
import "currency-flags/dist/currency-flags.min.css";

interface IProps {
  currencies: ICurrency[];
  onChange: (value: string) => void;
  selected: string;
  className: string;
}

export const CurrencySelector = ({
  currencies,
  onChange,
  selected,
  className,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`CurrencySelector ${className} ${
          open ? "CurrencySelector--open" : ""
        }`}
      >
        <div
          className="CurrencySelector__option CurrencySelector__selected"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`currency-flag currency-flag-${selected.toLowerCase()}`}
          />
          <h3>{selected}</h3>
        </div>
        <div className="CurrencySelector__options">
          {currencies.map((currency) => (
            <div
              onClick={() => {
                onChange(currency.code);
                setOpen(false);
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
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="CurrencySelector__overlay"
        />
      )}
    </>
  );
};
