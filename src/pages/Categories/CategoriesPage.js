import React, {Component} from 'react';
import ArticleList from '../../components/ArticleList';
import NoNews from '../../components/NoNews';

class CategoriesPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.match.params.id,
            news: [],
            page: 1,
            loading: false
        }

        this.fetchNewsHandler = this.fetchNewsHandler.bind(this);

        window.addEventListener('scroll', this.scrollHandler.bind(this));
    }

    async componentDidMount(){
        await this.fetchNewsHandler();
    }

    async componentWillReceiveProps(nextProps) {
        const newId = nextProps.match.params.id;
        const oldId = this.state.id;
        if(newId !== oldId) {
            await this.setState({ news:[], page: 1, id: newId});
            await this.fetchNewsHandler();
        }
    }

    async fetchNewsHandler () {
        let {page, news: oldNews, id} = this.state;
        try {
        this.setState({loading: true});
        const response = await fetch(`${API_URL}/top-headlines/${id}?country=us&page=${page}`)
        let newsResp =  await response.json();
        if (newsResp.length) {
            const news = [...oldNews, ...newsResp];
            page = page + 1;
            this.setState({ news, page, loading:false });
        }
        } catch(e) {
            this.setState({ loading:false });
            console.log(`failed to fetch ${id} news`);
        }
    }

    async scrollHandler() {
        
        const scrollPos = window.innerHeight + document.documentElement.scrollTop;
        const offset = document.documentElement.offsetHeight - 800;
        if (scrollPos > offset && !this.state.loading) {
            await this.fetchNewsHandler();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        const {news, loading} = this.state;
       return (
        <div className="categories-page">
            {!loading && !news.length && <NoNews />}
            {news.length ? <ArticleList articles={news} /> : null }
        </div>
    ) 
    }
    
}
export default CategoriesPage;