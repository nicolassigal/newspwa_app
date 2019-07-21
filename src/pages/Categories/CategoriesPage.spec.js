import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CategoriesPage from './CategoriesPage';
import { mount } from 'enzyme';

describe('Categories Page', () => {
  it('Categories page should render correctly', () => {
    const props = {
      match: {
          params: {
              id: 'technology'
          }
      }  
    }


   const wrapper = mount(<CategoriesPage {...props}/>)
   const fetchNewsHandler = jest.spyOn(wrapper.instance(), "fetchNewsHandler");

   wrapper.instance().componentDidMount();
   expect(wrapper).toMatchSnapshot();
   expect(fetchNewsHandler).toHaveBeenCalled();
  });
});