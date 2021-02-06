import React from "react";
import { Card } from "./Card";
import { mount } from 'enzyme';
import { globalMock } from '../../___mocks__/globalMock';
import { stockMock } from '../../___mocks__/stockMock';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

let wrapper;
let card = {
    ticker: 'BABA',
    stockData: stockMock,
    stockGlobalData: globalMock
}

let deleteCard = jest.fn();

const wrapperMount = (node, opts) => {
    let attachTo = document.createElement('div')
    document.body.appendChild(attachTo)  
    wrapper = mount(node, { ...opts, attachTo })
    return wrapper
}

describe("Card", () => {
    it('loads the search component', ()=> {
        wrapperMount(<Card stock={card} deleteCard={deleteCard} />);
        let theCard = wrapper.find('Card');
        expect(theCard.length).toEqual(1);
    });

    it('renders company name', ()=> {
        wrapperMount(<Card stock={card} deleteCard={deleteCard} />);
        let theCard = wrapper.find('h1');
        expect(theCard.text()).toEqual('Alibaba Group Holding Limited');
    });

    it('calls the delete prop when delete button clicked', ()=> {
        wrapperMount(<Card stock={card} deleteCard={deleteCard} />);
        wrapper.find('.deleteCard').simulate('click');
        expect(deleteCard).toHaveBeenCalled();
    });
});