//Custome API calling functionality.
import axios from 'axios';
import { Constants } from '../helpers/Constants';
import { AuthService } from './AuthService';

export class ApiService {
  constructor() {
    this.authService = new AuthService();
    this.callApi = this.callApi.bind(this);
    this.callAuthPermissions = this.callAuthPermissions.bind(this);
    this.callResourceReadData = this.callResourceReadData.bind(this);
    this._callResourceCreateStock = this._callResourceCreateStock.bind(this);
    this.callResourceAllUsers = this.callResourceAllUsers.bind(this);
    this._callResourceDeleteStock = this._callResourceDeleteStock.bind(this);
  }

  callApi() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callApi(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._callApi(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._callApi(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  _callApi(token) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    };

    return axios.get(Constants.apiRoot, { headers });
  }

  callResourceReadData() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callResourceReadData(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._callResourceReadData(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._callResourceReadData(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }
    _callResourceReadData(token) {
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      };
      return axios.get(Constants.resourceReadData, { headers });
    }

    callResourceAllUsers() {
      return this.authService.getUser().then(user => {
        if (user && user.access_token) {
          return this._callResourceAllUsers(user.access_token).catch(error => {
            if (error.response.status === 401) {
              return this.authService.renewToken().then(renewedUser => {
                return this._callResourceAllUsers(renewedUser.access_token);
              });
            }
            throw error;
          });
        } else if (user) {
          return this.authService.renewToken().then(renewedUser => {
            return this._callResourceAllUsers(renewedUser.access_token);
          });
        } else {
          throw new Error('user is not logged in');
        }
      });
    }
      _callResourceAllUsers(token) {
        const headers = {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        };
        return axios.get(Constants.resourceBroker, { headers });
      }

      callResourceCreateStock(user_id,stockValue) {
        return this.authService.getUser().then(user => {
          if (user && user.access_token) {
            return this._callResourceCreateStock(user.access_token,user_id,stockValue).catch(error => {
              if (error.response.status === 401) {
                return this.authService.renewToken().then(renewedUser => {
                  return this._callResourceCreateStock(renewedUser.access_token,user_id,stockValue);
                });
              }
              throw error;
            });
          } else if (user) {
            return this.authService.renewToken().then(renewedUser => {
              return this._callResourceCreateStock(renewedUser.access_token,user_id,stockValue);
            });
          } else {
            throw new Error('user is not logged in');
          }
        });
      }
        _callResourceCreateStock(token,user_id, stockValue) {
          const params = new URLSearchParams()
      params.append('user-id',user_id)
      params.append('stock',stockValue)
      console.log(user_id)
      console.log(stockValue)
          const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          };
          return axios.post(Constants.resourceBroker, params, { headers });
        }


        callResourceDeleteStock(user_id,stock_id) {
          return this.authService.getUser().then(user => {
            if (user && user.access_token) {
              return this._callResourceDeleteStock(user.access_token,user_id,stock_id).catch(error => {
                if (error.response.status === 401) {
                  return this.authService.renewToken().then(renewedUser => {
                    return this._callResourceDeleteStock(renewedUser.access_token,user_id,stock_id);
                  });
                }
                throw error;
              });
            } else if (user) {
              return this.authService.renewToken().then(renewedUser => {
                return this._callResourceDeleteStock(renewedUser.access_token,user_id,stock_id);
              });
            } else {
              throw new Error('user is not logged in');
            }
          });
        }
          _callResourceDeleteStock(token,user_id, stock_id) {
            const params = new URLSearchParams()
        params.append('user-id',user_id)
        params.append('stock',stock_id)
        console.log(user_id)
        console.log(stock_id)
            const headers = {
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            };
            return axios.delete(Constants.resourceBroker, params, { headers });
          }

    //make permission call to Auth server
  callAuthPermissions() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callAuthPermissions(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._callAuthPermissions(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._callAuthPermissions(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }
    _callAuthPermissions(token) {
      const params = new URLSearchParams()
      params.append('grant_type',Constants.permissionGrantType)
      params.append('audience',Constants.clientId)
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      };
      return axios.post(Constants.authPermissions, params , { headers });
    }
}
