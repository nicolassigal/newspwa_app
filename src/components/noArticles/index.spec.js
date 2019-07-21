import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NoArticles from './index';
import { shallow } from 'enzyme';

describe('NoArticle component test', () => {
  it('NoArticle component should render correctly', () => {
   const wrapper = shallow(<NoArticles />)
   expect(wrapper).toMatchSnapshot();
  });
});