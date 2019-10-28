import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { Header } from './components/header/Header';
import Button from 'antd-mobile/lib/button';
import TabBar from './components/tabBar/TabBar';

const Index: React.FC = () => {
    return (
        <div>Index</div>
    );
};

const Mine: React.FC = () => {
    return (
        <div>Mine</div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <div>
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
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route path="/mine">
                        <Mine />
                    </Route>
                </Switch>
            </div>
            <Header />
            <Button>Click Me</Button>
            <TabBar />
        </Router>
    );
};

export default App;
