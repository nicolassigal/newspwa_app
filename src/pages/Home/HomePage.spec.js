import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('Home page should render correctly', () => {
    const tree = renderer
      .create(<HomePage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});