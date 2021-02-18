import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DataShow from "./components/dataShow";
import DataEpisodes from "./components/dataEpisodes";
import List from "./components/list";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/list">List</Link>
              </li>
              <li>
                <Link to="/episodes">Episodes</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/episodes">
              <DataEpisodes />
            </Route>
            <Route exact path="/">
              <DataShow />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
