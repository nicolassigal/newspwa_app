import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Navbar from './index';
import { shallow } from 'enzyme';

describe('Navbar component test', () => {
  it('Navbar component should render correctly', () => {
    const props = {
      categories: []  
    }


   const wrapper = shallow(<Navbar {...props}/>)
   expect(wrapper).toMatchSnapshot();

  });

  it('Navbar component should render with list', () => {
    const props = {
        categories: [
           "cat_1",
           "cat_2"
        ]  
    }


   const wrapper = shallow(<Navbar {...props}/>)
   expect(wrapper).toMatchSnapshot();

   const Articles = wrapper.find("#menu").getElement();
   expect(Articles.props.children).toHaveLength(2);
  });
});