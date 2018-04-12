import React from 'react';
import { BrowserRouter as Router, Route/*, Link*/ } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';

import Playground from './components/Playground';

const About = () => <div><h2>About</h2></div>;

const App = () => (
    <Router>
        <div className="App">
            {/*<header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>*/}
            {/*<ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr/>*/}

            <Route exact path="/" component={ Playground }/>
            <Route path="/about" component={About}/>
        </div>
    </Router>
);

export default App;
