import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { CurrencySelector } from "./CurrencySelector";
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

  const {
    loading: currenciesLoading,
    error: currenciesError,
    data: currenciesData,
  } = useQuery(CURRENCIES_QUERY);

  const [getConversion, { loading, data }] = useLazyQuery(CONVERSION_QUERY, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.conversion) {
      setConversionResult(data.conversion);
      refetchStats();
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (currenciesLoading) return <p>Loading...</p>;
  if (currenciesError) return <p>Error :(</p>;

  return (
    <section className="Converter">
      <form className="Converter__form">
        <input
          className="Converter__input Converter__form__item"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <CurrencySelector
          currencies={currenciesData.currencies}
          onChange={(value) => {
            setFromCurrency(value);
            setConversionResult(null);
          }}
          selected={fromCurrency}
          className="Converter__form__item"
        />
        <CurrencySelector
          currencies={currenciesData.currencies}
          onChange={(value) => {
            setDestinationCurrency(value);
            setConversionResult(null);
          }}
          selected={destinationCurrency}
          className="Converter__form__item"
        />

        <button
          className="Converter__button Converter__form__item"
          onClick={() => {
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
      </form>
      {conversionResult && (
        <div className="Converter__result">
          {conversionResult.toFixed(5)} {destinationCurrency}
        </div>
      )}
    </section>
  );
};
