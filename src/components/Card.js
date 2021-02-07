import React from 'react';
import './Card.scss';

export const Card = ({ stock, deleteCard }) => {
  const eps = parseFloat(stock.stockData['EPS']);
  const epsTotal = parseFloat(stock.stockData['EPS-total']);
  const epsWidth = ((eps / epsTotal) * 100) + '%';

  return (
    <div className="card">
      <div className="deleteCard" onClick={ ()=> {
          deleteCard(stock.stockData.Symbol);
        }}>
        <span>&#10005;</span>
      </div>
      <h1>{stock.stockData['Name']}</h1>
      <h2>Stats</h2>
        <div className="stat">
          <h3>52 Week High:</h3>
          <div className="value">{stock.stockData['52WeekHigh']}</div>
        </div>
        <div className="stat">
          <h3>52 Week Low:</h3>
          <div className="value">{stock.stockData['52WeekLow']}</div>
        </div>
        <div className="stat">
          <h3>Sector:</h3>
          <div className="value">{stock.stockData['Sector']}</div>
        </div>
        <div className="stat">
          <h3>EPS:</h3>
          <div className="value">{stock.stockData['EPS']}</div>
        </div>
        <div className="earnings">
          <div className="bar" style={{width: epsWidth}}></div>
        </div>
    </div>
  );
};
