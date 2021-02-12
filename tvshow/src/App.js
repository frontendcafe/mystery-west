import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <nav><ul><li>Home</li><li>About</li><li>Episodes</li></ul></nav>
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/episodes'>
            <Episodes />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </header>
    </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>
}

function Episodes() {
  return <h2>Episodes</h2>
}
export default App;
