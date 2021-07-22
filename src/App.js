import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Container, Navigation } from './components';
import { Home, Article, Favorites } from './pages';

const App = () => {
  return (
    <Container main>
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
