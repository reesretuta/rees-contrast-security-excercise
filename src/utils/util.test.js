import { addNewCard } from "../utils/util";
import { globalMock } from '../../___mocks__/globalMock';
import { stockMock } from '../../___mocks__/stockMock';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

let card = {
    ticker: 'BABA',
    stockData: stockMock,
    stockGlobalData: globalMock
}

describe("Util", () => {
    it("should add in new card", () => {
        let allCards = addNewCard([], card);
        expect(allCards.length).toEqual(1);
    });

    it("should calculate the highest EPS of all provided stocks", () => {
        let card = {
            ticker: 'TSLA',
            stockData: {
                EPS: '50'
            },
            stockGlobalData: globalMock
        }
        let newCard = {
            ticker: 'TSLA',
            stockData: {
                EPS: '199'
            },
            stockGlobalData: globalMock
        }
        let allCards = addNewCard([card], newCard);
        expect(allCards[0].stockData['EPS-total']).toEqual(199);
    });
});