import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ArticleList from './index';
import { shallow } from 'enzyme';
import "intersection-observer";

describe('ArticleList component test', () => {
  it('ArticleList component should render correctly', () => {
    const props = {
      articles: []  
    }


   const wrapper = shallow(<ArticleList {...props}/>)
   expect(wrapper).toMatchSnapshot();

  });

  it('ArticleList component should render with list', () => {
    const props = {
        articles: [
            {
                title: 'title_1',
                description: 'desc_1',
                url: 'url_1',
                image:'image_1',
                key: '1'
            },
            {
                title: 'title_2',
                description: 'desc_2',
                url: 'url_2',
                image:'image_2',
                key: '2'
            }
        ]  
    }


   const wrapper = shallow(<ArticleList {...props}/>)
   expect(wrapper).toMatchSnapshot();

   const Articles = wrapper.find(".article-list").getElement();
   expect(Articles.props.children).toHaveLength(2);
  });
});