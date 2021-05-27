import React, { FC } from 'react';
import '@/styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import { TocDataProvider } from '@/contexts/TocDataContext';
import Article from '@/pages/Article';

const App: FC = (): JSX.Element => {
  return (
    <TocDataProvider>
      <Router>
        <Switch>
          <Route path='/:id'>
            <Article/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </TocDataProvider>
  );
};

export default App;
