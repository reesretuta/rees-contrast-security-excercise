export const addNewCard = (cards, newCard) => {
    let newCards = [...cards, newCard];
  
    const maxEPS = newCards.reduce((acc, card) => {
    return Math.max(acc, parseFloat(card.stockData['EPS']));
    }, 0);

    newCards.forEach(card => {
        card.stockData['EPS-total'] = maxEPS;
    });

    return newCards;
};