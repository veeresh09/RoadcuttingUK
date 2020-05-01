import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'//To enable navigation between pages
//importing all the components
import Dashboard from './components/layouts/Dashboard'
import Home from './components/layouts/Home'
import RoadForm from './components/layouts/Form'
import Search from './components/layouts/Search'
import editForm from './components/layouts/editForm'
import Payment from './components/layouts/Payment'
import Reciept from './components/layouts/Reciept'
import Temp from './components/layouts/temp'
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      userdata: "",
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'}
              render={
                props => (
                  <Home {...props} />
                )} />
            <Route exact path={'/dashboard'} component={Dashboard} />
            <Route exact path={'/form'} component={RoadForm} />
            <Route exact path={'/search'} component={Search} />
            <Route exact path={'/edit'} component={editForm} />
            <Route exact path={'/pay'} component={Payment} />
            <Route exact path={'/reciept'} component={Reciept} />
            <Route exact path={'/temp'} component={Temp} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}
export default App;
