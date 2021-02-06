import mockAxios from "axios";
import React from "react";
import { SearchTicker } from "./SearchTicker";
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import { act } from "react-dom/test-utils";
import { Search } from 'semantic-ui-react';

jest.mock("axios", () => ({
    get: jest.fn().mockReturnValue(
        {
            data: {
                bestMatches: [
                    {
                    '1. symbol': 'BABA',
                    '2. name': 'TSLA'
                    }
                ]
            }
        }
    )
}));

let wrapper;

const wrapperMount = (node, opts) => {
    let attachTo = document.createElement('div');
    document.body.appendChild(attachTo);
    wrapper = mount(node, { ...opts, attachTo });
    return wrapper;
}

describe("SearchTicker", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('loads the search component', ()=> {
        let addCard = jest.fn();
        wrapperMount(<SearchTicker addCard={addCard} />);
        let search = wrapper.find('Search');
        expect(search.length).toEqual(1);
    });

    it('initially empty search results', ()=> {
        let addCard = jest.fn();
        wrapperMount(<SearchTicker addCard={addCard} />);
        let search = wrapper.find('SearchResult');
        expect(search.length).toEqual(0);
    });

    it('should fetch on text change of input field', async ()=> {
        let addCard = jest.fn();
        wrapperMount(<SearchTicker addCard={addCard} />);
        await act(async () => {
            wrapper.find('input.prompt').simulate('change', { target: { value: 'baba' } });
        });
        
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
});  

describe("Search Component", () => {
    it('renders results when results set is provided', () => {
      const tickers = [
        { title: 'ticker1', description: 'desc1' },
        { title: 'ticker2', description: 'desc2' },
        { title: 'ticker3', description: 'desc3' },
      ];
      wrapperMount(<Search results={tickers} />).find('input.prompt')

      expect(wrapper.find('SearchResult').length).toEqual(3);
    });

});
