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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/episodes/:id">
            <DataEpisodes />
          </Route>
          <Route path="/episodes">
            <List />
          </Route>
          <Route exact path="/">
            <DataShow />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
