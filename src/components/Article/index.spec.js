import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Article from './index';
import { shallow } from 'enzyme';

describe('Article component test', () => {
  it('Article component should render correctly', () => {
    const props = {
      title: "title",
      description: "desc",
      image: "img",
      url:"url"
    }


   const wrapper = shallow(<Article {...props}/>)
   expect(wrapper).toMatchSnapshot();

  });
});