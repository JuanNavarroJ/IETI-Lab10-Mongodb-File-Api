import React  from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Dashboard from './components/Dashboard';



function App() {

  const [userList] = React.useState([]); 

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/Dashboard">
            <Dashboard userList={userList}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
