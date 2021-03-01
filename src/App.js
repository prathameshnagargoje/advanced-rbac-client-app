import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import Secured from './Secured/secured'
// import OktaLoginForm from './OktaLogin/oktaLoginForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Welcome} />
          <Route path="/secured" component={Secured} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
