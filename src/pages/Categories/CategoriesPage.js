import React, {Component} from 'react';
import ArticleList from '../../components/ArticleList';
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
        this.scrollHandler = this.scrollHandler.bind(this);

        window.onscroll = this.scrollHandler;
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

    render() {
        const {news} = this.state;
       return (
        <div className="categories-page">
            <ArticleList articles={news} />
        </div>
    ) 
    }
    
}
export default CategoriesPage;