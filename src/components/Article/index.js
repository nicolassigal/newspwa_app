import React, {PureComponent} from 'react';
import Image from '../Image';
class Article extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {loading: true}
        this.loadHandler = this.loadHandler.bind(this);
    }

    loadHandler() {
        this.setState({loading: false})
    }

    render() {
        const {loading} = this.state;
        return (
            <a href={this.props.url}  className="article">
                <article>
                    <Image
                        className={`article__picture ${loading ? 'preload' : ''}`}
                        onLoad={this.loadHandler}
                        src={this.props.image} />
                    <h1 className="article__title">{this.props.title}</h1>
                    <p className="article__description">{this.props.description}</p>
                </article>
            </a>
        )
    }
}

export default Article;