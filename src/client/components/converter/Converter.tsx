import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useSpring, animated } from "react-spring";
import { CurrencySelector } from "../currency-selector/CurrencySelector";
import "./Converter.scss";

const CURRENCIES_QUERY = gql`
  query {
    currencies {
      code
      name
    }
  }
`;

const CONVERSION_QUERY = gql`
  query getConversion(
    $fromCurrency: String!
    $destinationCurrency: String!
    $amount: Float!
  ) {
    conversion(
      fromCurrency: $fromCurrency
      destinationCurrency: $destinationCurrency
      amount: $amount
    )
  }
`;

interface IProps {
  refetchStats: () => void;
}

export const Converter = ({ refetchStats }: IProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [destinationCurrency, setDestinationCurrency] = useState<string>("EUR");
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const animation = useSpring({ height: conversionResult ? 100 : 0 });

  const { loading, data: currenciesData } = useQuery(CURRENCIES_QUERY);

  const [getConversion, { data }] = useLazyQuery(CONVERSION_QUERY, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.conversion) {
      setConversionResult(data.conversion.toFixed(5));
      refetchStats();
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="Converter">
      <form className="Converter__form">
        <div className="Converter__form__item">
          <div className="Converter__form__label">Amount</div>
          <input
            className="Converter__input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <div className="Converter__form__item">
          <div className="Converter__form__label">From</div>
          <CurrencySelector
            currencies={currenciesData.currencies}
            onChange={(value) => {
              setFromCurrency(value);
              setConversionResult(null);
            }}
            selected={fromCurrency}
            className=""
          />
        </div>
        <div className="Converter__form__item">
          <div className="Converter__form__label">To</div>
          <CurrencySelector
            currencies={currenciesData.currencies}
            onChange={(value) => {
              setDestinationCurrency(value);
              setConversionResult(null);
            }}
            selected={destinationCurrency}
            className=""
          />
        </div>
        <div className="Converter__form__item">
          <button
            className="Converter__button"
            onClick={(e) => {
              e.preventDefault();
              getConversion({
                variables: {
                  fromCurrency,
                  destinationCurrency,
                  amount,
                },
              });
            }}
          >
            Convert
          </button>
        </div>
      </form>
      <animated.div className="Converter__result" style={animation}>
        {conversionResult && `${conversionResult} ${destinationCurrency}`}
      </animated.div>
    </section>
  );
};
