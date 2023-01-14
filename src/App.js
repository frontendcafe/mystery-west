import React from 'react';
import './styles/global.css';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import DataShow from './components/dataShow';
import DataEpisodes from './components/dataEpisodes';
import List from './components/list';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <ul className="navList">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/episodeList">Episodes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/id=:id/season_:season/episode_:number">
              <DataEpisodes />
            </Route>
            <Route path="/episodeList">
              <List />
            </Route>
            <Route exact path="/">
              <DataShow />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
