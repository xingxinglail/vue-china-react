import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { Header } from './components/header/Header';
import Index from './views/index/Index';
import TabBar from './components/tabBar/TabBar';

const Mine: React.FC = () => {
    return (
        <div>Mine</div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ Index } />
                    <Route path="/mine" component={ Mine } />
                </Switch>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/mine">Mine</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Header />
            <TabBar />
        </Router>
    );
};

export default App;
