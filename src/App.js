import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import Navbar from './components/Navbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        try {
            const response = await fetch(`${API_URL}/categories?country=us`);
            const categories = await response.json();
            this.setState({ categories, loading: false });
        } catch (e) {
            console.log("failed to fetch sources", e);
        }
    }

    render() {
        let { categories, loading, categoryNews } = this.state;

        return (
            <div className="app-container">
                {!loading && <Navbar categories={categories} />}
                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path="/categories/:id" exact={true} component={CategoriesPage} />
                    <Route path="*" exact={true} component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;