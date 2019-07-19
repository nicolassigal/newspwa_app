import React, {PureComponent} from 'react';

class Image extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { intersected: false};
    this.observer = null;
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.setState({ intersected: true });
        this.observer.disconnect();
      }
    });

    this.observer.observe(this.imgTag);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { src, alt, ...props } = this.props;

    return (
        <img
        load="lazy"
        src={this.state.intersected ? src : '' }
        alt={alt || ''}
        ref={elem => (this.imgTag = elem)}
        {...props}/>
    );
  }
}

export default Image;
