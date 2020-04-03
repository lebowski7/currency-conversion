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
      <div className="Stats__box">
        <h2>Interesting facts</h2>
        {stats.destinationCurrencies.length > 0 && (
          <div>
            Most popular destination currency:
            <strong className="Stats__highlight">
              {" "}
              {stats.destinationCurrencies[0].code}
            </strong>
          </div>
        )}
        <div>
          Total USD:{" "}
          <strong className="Stats__highlight">
            {stats.totalUSDConverted.toFixed(5)} USD
          </strong>
        </div>
        <div>
          Total Requests:{" "}
          <strong className="Stats__highlight">
            {stats.totalConversionRequests}
          </strong>
        </div>
      </div>

      {stats.destinationCurrencies.length > 0 && (
        <div className="Stats__box">
          <h2>TOP 10 destination currencies</h2>
          <ol>
            {stats.destinationCurrencies.slice(0, 10).map((currency) => (
              <li key={currency.code}>
                <strong>{currency.code}</strong> ({currency.popularity}x)
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};
