import React from 'react';
import Routes from './App.routes';
import { Switch, Route, Link } from 'react-router-dom';
const App = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Switch>
            {
                Routes.map(({ path, component: Comp, exact }, i) => {
                if(Comp) {
                    return <Route key={i} path={path} exact={exact} render={ ()=> <Comp /> }/>
                }
            }                            
            )}
            </Switch>
        </div>
    );
}

export default App;