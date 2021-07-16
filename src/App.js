import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Article from './pages/Article';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/article/:id' component={Article} />
          <Route component={() => 404} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
