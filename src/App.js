import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Container } from './components';
import { Header } from './containers';
import { Home, Article, Favorites } from './pages';

const App = () => {
  return (
    <Container main>
      <Router>
        <Header />
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
