import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer } from './components';
import { Navigation } from './containers';
import { Home, Article, Favorites } from './pages';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <div className="app__wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/article/:id" component={Article} />
            <Route component={() => 404} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
