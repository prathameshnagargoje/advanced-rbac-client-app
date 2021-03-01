import { toast } from 'react-toastify';
import React, { Component } from 'react';
import { Login } from '../keyCloakLogin/loginComponent';
import { AuthService } from '../Service/AuthService';
import { ApiService } from '../Service/ApiService';
import AuthContent from './AuthContent';
import UserRolebaseContent from './UserRolebaseContent';
import jwt_decode from 'jwt-decode';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Constants } from '../helpers/Constants';
import { type } from 'ramda';
import { isEqual, set } from 'lodash';
import DropDown from '../Components/DropdownComp'


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.state = { api: {}, user: {}, decodeJWT: {}, readData: {}, stock: '', userId: null, stockId: null};
  }

  componentDidMount() {
    this.getUser();
    this.apiService.callAuthPermissions() //Getting role based data from resource server api call.
      .then(({ data }) => {
        this.state.user.access_token = data.access_token
        this.authService.store(this.state.user)
        this.setState({ decodeJWT: jwt_decode(data.access_token) })
      this.callResourceRead();
    })
      .catch(error => {
        console.log('User not logged in');
      });
  }

  login = () => {
    this.authService.login()
      .catch(e => {
        console.log('>>>>', e); //Do something if keyclock server is not available or down.!!!
      })
      ;
  };

  callApi = () => {
    this.apiService.callApi().then(data => {
      this.setState({ api: data.data });
      toast.success('Api return successfully data, check in section - Api response');
    })
      .catch(error => {
        toast.error(error);
      });
  };

  componentWillUnmount() {
    this.shouldCancel = true;
  }

  renewToken = () => {
    this.authService
      .renewToken()
      .then(user => {
        toast.success('Token has been sucessfully renewed. :-)');
        this.getUser();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  logout = () => {
    this.authService.logout();
  };

  getUser = () => {
    this.authService.getUser().then(user => {
      if (user) {
        toast.success('User has been successfully loaded from store.');
      } else {
        toast.info('You are not logged in.');
      }

      if (!this.shouldCancel) {
        let decodedJWT;
        if (get(user, 'access_token', false)) {
          decodedJWT = jwt_decode(get(user, 'access_token'));
        }
        this.setState({ user, decodeJWT: decodedJWT });
      }
    });
  };

  callResourceRead(){
    this.apiService.callResourceReadData()
    .then(data => {
      this.setState({readData:data})
      console.log(data)
    })
    .catch(error => {
      console.error("can't reach resource server...")
    })
  }

  changeStockValue(evt){
    this.setState({stock: evt.target.value});
  }

  handleUserDD(value){
    this.setState({userId: value});
  }

  handleStockDD(value){
    this.setState({stockId: value});
  }

  callCreateStock(){
    //get state and call create stock api
    var user_id = get(this.state, 'userId', false)
    var stockValue = get(this.state, 'stock', false)
    if(user_id && stockValue)
      this.apiService.callResourceCreateStock(user_id,stockValue)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log("Error: while creating stock")
      })
  }

  callDeleteStock(){
    var user_id = get(this.state, 'userId', false)
    var stock_id = get(this.state, 'stock', false)
    if(user_id&&stock_id)
      this.apiService.callResourceDeleteStock(user_id,stock_id)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log("Error: unable to delete stock")
      })
    
  }

  createFinalTab() {
    var permissions = get(this.state, 'decodeJWT.authorization.permissions', {});
    var scopes = map(map(permissions, (p)=>(p.scopes))[0], (scope)=>(scope))
    var elements = [];
    let item;
      if(scopes.includes('READ')){
        item = 'READ'
        elements.push(<Tab eventKey={item || ''} title={item || ''}>
      <div><UserRolebaseContent data={this.state.readData.data} /></div>
    </Tab>)}
      if(scopes.includes('CREATE')){
        item = 'CREATE'
        elements.push(<Tab eventKey={item || ''} title={item || ''}>
      <div>
        <div>
        <label htmlFor="">Select User</label><DropDown handleStateChange={evt => this.handleUserDD(evt)} /><br/><label htmlFor="">Stock Value</label><input type="text" name="stockValue" id="stockValue" onChange={evt => this.changeStockValue(evt)}/>
        </div>
        <input type="button" value="CREATE" onClick={evt => this.callCreateStock()} />
      </div>
    </Tab>)}
      if(scopes.includes('UPDATE')){
        item = 'UPDATE'
        elements.push(<Tab eventKey={item || ''} title={item || ''}>
      <div><UserRolebaseContent data={this.state.readData.data} /></div>
    </Tab>)}
      if(scopes.includes('DELETE')){
        item = 'DELETE'
        elements.push(<Tab eventKey={item || ''} title={item || ''}>
      <div>
        <div>
        <label htmlFor="">Select User</label><DropDown handleStateChange={evt => this.handleUserDD(evt)} /><br/><label htmlFor="">Enter Stock Id</label><input type="text" name="stockValue" id="stockValue" onChange={evt => this.changeStockValue(evt)}/>
        </div>
        <input type="button" value="Delete" onClick={evt => this.callDeleteStock()} />
      </div>
    </Tab>)}
    
    return elements
  }

  render() {
    return (
      <div className="Welcome">
        <p>This is your public-facing component.</p>
        <Login
          login={this.login}
          logout={this.logout}
          renewToken={this.renewToken}
          getUser={this.getUser}
          callApi={this.callApi}
        />
        <Tabs>
          {this.createFinalTab()}
        </Tabs>
        <AuthContent api={this.state.api} user={this.state.user} />
        <UserRolebaseContent data={this.state.decodeJWT} />
      </div>
    );
  }
}
export default Welcome;