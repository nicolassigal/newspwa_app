import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NotFoundPage from './NotFoundPage';

describe('Not Found Page', () => {
  it('Not Found page should render correctly', () => {
    const tree = renderer
      .create(<NotFoundPage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});