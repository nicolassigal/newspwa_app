import React, { Component } from "react";
import ArticleList from '../../components/ArticleList';
import NoArticles from './../../components/NoArticles';
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            page: 1,
            loading: false
        };

        this.fetchNews = this.fetchNews.bind(this);

        window.addEventListener('scroll', this.scrollHandler.bind(this));
    }

    async componentDidMount() {
        await this.fetchNews();
    }

    async fetchNews() {
        let {page, news: oldNews, loading} = this.state;
        this.setState({loading: true})
        try {
        const response = await fetch(`${API_URL}/top-headlines?country=us&page=${page}`);
        const newsResp = await response.json();
        if (newsResp.length) {
            const news = [...oldNews, ...newsResp];
            page = page + 1;
            this.setState({ news, page, loading:false });
        }
        } catch(e) {
            this.setState({ loading:false });
            console.log("failed to fetch home news");
        }
    }

    async scrollHandler() {
        const scrollPos = window.innerHeight + document.documentElement.scrollTop;
        const offset = document.documentElement.offsetHeight - 800;
        if (scrollPos > offset  && !this.state.loading) {
            await this.fetchNews();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        const { news, loading } = this.state;
        return (
            <div className="home-page">
                {!loading && !news.length && <NoArticles />}
                {news.length ? <ArticleList articles={news} /> : null }
            </div>
        );
    }
}

export default HomePage;
