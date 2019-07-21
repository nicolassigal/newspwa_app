import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NightMode from './index';
import { shallow, mount } from 'enzyme';

describe('NightMode component test', () => {
  it('NightMode component should render correctly', () => {
   const wrapper = shallow(<NightMode />)
   expect(wrapper).toMatchSnapshot();
  });
});