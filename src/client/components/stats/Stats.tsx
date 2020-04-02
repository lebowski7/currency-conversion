import React from "react";
import "./Stats.scss";

interface ICurrencyStats {
  code: string;
  popularity: number;
}

interface IProps {
  stats: {
    destinationCurrencies: [ICurrencyStats];
    totalUSDConverted: number;
    totalConversionRequests: number;
  };
}

export const Stats = ({ stats }: IProps) => {
  return (
    <section className="Stats">
      <h2>Interesting facts</h2>
      {stats.destinationCurrencies.length > 0 && (
        <div>
          Most popular destination currency:
          <strong> {stats.destinationCurrencies[0].code}</strong>
        </div>
      )}
      <div>
        Total USD: <strong>{stats.totalUSDConverted.toFixed(6)} USD</strong>
      </div>
      <div>
        Total Requests: <strong>{stats.totalConversionRequests}</strong>
      </div>

      {stats.destinationCurrencies.length > 0 && (
        <>
          <h2>TOP 10 destination currency</h2>
          <ol>
            {stats.destinationCurrencies.slice(0, 10).map((currency) => (
              <li key={currency.code}>
                {currency.code}: <strong>{currency.popularity}x</strong>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
};
