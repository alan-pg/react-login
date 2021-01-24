import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthProvider } from '../components/Store/provider'
import RoutesPrivate from 'components/Routes/Private/Private'
import Home from './Home/Home';
import Login from './Login/Login';
import Cadastro from './Cadastro/Cadastro'

const PagesRoot = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <RoutesPrivate path="/" component={Home} />
      </Switch>
    </AuthProvider>
  </Router>
)


export default PagesRoot;
