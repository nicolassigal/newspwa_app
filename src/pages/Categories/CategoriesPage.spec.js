import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CategoriesPage from './CategoriesPage';

describe('Categories Page', () => {
  it('Categories page should render correctly', () => {
    const props = {
      match: {
          params: {
              id: 'technology'
          }
      }  
    }
    const tree = renderer
      .create(<CategoriesPage {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});