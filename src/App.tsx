import React, {useEffect, useState} from 'react';
import Sidebar from './components/Sidebar';
import DefaultLayout from './layouts/Default';
import '@/styles/main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Article from './pages/Article';
import NotFound from '@/pages/NotFound';

const App: React.FC = (): JSX.Element => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isFetching = false;
    const fetchData = async () => {
      const response = await fetch('/data/HelpTOC.json');
      const result = await response.json();
      !isFetching && setData(result);
    };

    fetchData();


    return () => {
      isFetching = true;
    };
  }, []);

  return (
    <Router>
      <DefaultLayout>
        {data && (
          <Sidebar data={data}/>
        )}
        <div>
          <Switch>
            <Route path="/:id">
              <Article />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </DefaultLayout>
    </Router>
  );
}

export default App;