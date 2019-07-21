import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NoNews from './index';
import { shallow } from 'enzyme';

describe('NoNews component test', () => {
  it('NoNews component should render correctly', () => {
   const wrapper = shallow(<NoNews />)
   expect(wrapper).toMatchSnapshot();
  });
});