import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Header } from "./components/header/Header";
import { Converter } from "./components/converter/Converter";
import { Stats } from "./components/stats/Stats";
import "./App.scss";

const STATS_QUERY = gql`
  query {
    stats {
      destinationCurrencies {
        code
        popularity
      }
      totalUSDConverted
      totalConversionRequests
    }
  }
`;

export const App = () => {
  const { loading, error, data, refetch } = useQuery(STATS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <div className="App__wrapper">
        <Header />
        <Converter refetchStats={refetch} />
        <Stats stats={data.stats} />
      </div>
    </div>
  );
};
