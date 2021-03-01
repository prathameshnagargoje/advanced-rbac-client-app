import React, { Component } from 'react';

export class Login extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
                    <button className="btn btn-primary btn-login" style={{ margin: '10px' }} onClick={this.props.login}>
                    Login
                    </button>
                    <button className="btn btn-secondary btn-getuser" style={{ margin: '10px' }} onClick={this.props.getUser}>
                    Get Keycloak User info from sessionStorage
                    </button>
                    <button className="btn btn-warning btn-getapi" style={{ margin: '10px' }} onClick={this.props.callApi}>
                    Call Custom Keycloak Useinfo API
                    </button>
                    <button className="btn btn-success btn-renewtoken" style={{ margin: '10px' }} onClick={this.props.renewToken}>
                    Renew Keycloak Access Token
                    </button>
                    <button className="btn btn-dark btn-logout" style={{ margin: '10px' }} onClick={this.props.logout}>
                    Logout
                    </button>
                </div>
            </div>
        );
    }
}