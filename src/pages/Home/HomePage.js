import React, { Component } from "react";
import ArticleList from '../../components/ArticleList';
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            page: 1,
            loading: false
        };

        this.fetchNews = this.fetchNews.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);

        window.onscroll = this.scrollHandler;
    }

    async componentDidMount() {
        await this.fetchNews();
    }

    async fetchNews() {
        let {page, news: oldNews, loading} = this.state;
        this.setState({loading: true})
        const response = await fetch(`http://localhost:5000/top-headlines?country=us&page=${page}`);
        const newsResp = await response.json();
        if (newsResp.length) {
            const news = [...oldNews, ...newsResp];
            page = page + 1;
            this.setState({ news, page, loading:false });
        }
    }

    async scrollHandler() {
        const scrollPos = window.innerHeight + document.documentElement.scrollTop;
        const offset = document.documentElement.offsetHeight - 800;
        if (scrollPos > offset  && !this.state.loading) {
            await this.fetchNews();
        }
    }

    render() {
        const { news } = this.state;
        return (
            <div className="home-page">
                {news && <ArticleList articles={news} />}
            </div>
        );
    }
}

export default HomePage;
