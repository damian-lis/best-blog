import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Container } from './components';
import { Navigation } from './containers';
import { Home, Article, Favorites } from './pages';

const App = ({ ...restProps }) => {
  return (
    <Container main {...restProps}>
      <Router>
        <Navigation />
        <Container mainWrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/article/:id" component={Article} />
            <Route component={() => 404} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Container>
  );
};

export default App;
