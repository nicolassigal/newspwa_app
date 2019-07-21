import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Image from './index';
import { render } from 'enzyme';

describe('Image component test', () => {
  it('Image component should render correctly', () => {
    const props = {
      alt: "alt",
      src: "src.png",
      onLoad: () => {}
    }


   const wrapper = render(<Image {...props}/>)
   expect(wrapper).toMatchSnapshot();

  });
});