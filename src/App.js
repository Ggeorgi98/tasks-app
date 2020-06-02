import React from 'react';
import './App.css';
import { NonAuthenticatedRoute } from './utilities/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utilities/guards/AuthenticatedRoute';
import { Switch } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Register } from './components/auth/register/Register';
import { Login } from './components/auth/login/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthenticatedRoute path="/login" exact component={Login} />
        <NonAuthenticatedRoute path="/register" exact component={Register} />
        <AuthenticatedRoute path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
