import React, { useState } from "react";
import { getTickerOverview, getTickerGlobal } from "../utils/api";
import { Card } from "../components/Card";
import { SearchTicker } from "../components/SearchTicker";
import "./Main.scss";

export const Main = () => {
  let [cards, setCards] = useState([]);

  const addCard = (ticker) => {
    if(!cards.find((c)=> c.ticker === ticker)) {
      fetchStock(ticker);
    }
  }

  const deleteCard = (ticker) => {
    setCards(cards.filter(c => c.ticker != ticker));
  }

  const fetchStock = async (ticker) => {
    const stockData = await getTickerOverview({ticker});
    const stockGlobalData = await getTickerGlobal({ticker});
    if(Object.keys(stockData.data).length === 0) {
      alert(`No Data Found for ${ticker}`);
      return;
    }
    if(stockData.data['Note'] || stockGlobalData.data['Note']) {
      alert(stockGlobalData.data['Note']);
      return;
    }

    let newCards = [...cards, 
      {
        ticker,
        stockData: stockData.data,
        stockGlobalData: stockGlobalData.data
      }
    ];

    const maxEPS = newCards.reduce((acc, card) => {
      return Math.max(acc, parseFloat(card.stockData['EPS']));
    }, 0);

    newCards.forEach(card => {
      card.stockData['EPS-total'] = maxEPS;
    });

    setCards(newCards);
  };
  
  return (
    <div className="wrap">
      <h2>Stock Comparison Tool</h2>
      <p>search any stock by symbol or name</p>
      <SearchTicker addCard={addCard} />
      <div id="cards">
          {
            cards.map((card) => {
              return <Card key={card.ticker} stock={card} deleteCard={deleteCard}/>
            })
          }
      </div>
    </div>
  );
}
