import React, { useState } from "react";
import { Search } from 'semantic-ui-react'
import { getSimilarTickers } from "../utils/api";

export const SearchTicker = ({addCard}) => {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = async (e, { name, value }) => {
    if(!value) {
      setTickers([]);
      return;
    }

    setLoading(true);

    const stock = await getSimilarTickers({ticker: value});
    if(stock.data['Note']) {
      alert(stock.data['Note']);
      return;
    }

    let list = stock.data.bestMatches ? 
                stock.data.bestMatches.map(s => { 
                  return {
                    title: s['1. symbol'],
                    description: s['2. name']
                  }
                }) : [];

    setTickers(list);
    setLoading(false);
  };

  const handleResultSelect = (e, { result }) => {
    addCard(result.title);
  }

  return (
    <Search
      data-testid='searchInput'
      input={{ icon: 'search', iconPosition: 'left' }}
      loading={loading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={tickers}
    />
  );
};
