import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';

function App() {
  return (
    <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/detail/:id" component={ Detail } exact/>
        <Route path="*" render={() => (<Redirect to="/" />)} />
    </Switch>
  )
}

export default App;