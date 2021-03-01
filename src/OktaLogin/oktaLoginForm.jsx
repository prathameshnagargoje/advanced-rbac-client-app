//No longer using this.
import React from 'react';
import styles from './oktaLoginForm.module.scss';

export default class OktaLoginForm extends React.PureComponent {
    constructor(props){
        super(props);
        this.checkfunction = this.checkfunction.bind(this);
    }

    checkfunction() {
    }
    render() {
        return <div className={styles.containerOkta}>
            <iframe
                title={"Login"}
                id='iframeRef'
                onLoadStart={(e) => {
                    console.log('>>>>>> onLoadStart', e);
                    console.log('>>>>>', this.iframeRef.src);

                }}

                onLoad={(e) => {
                    console.log('>>>>>', e);
                    this.checkfunction();
                }}
                onChange={(e) => {
                    console.log('>>>change', e);
                }}
                onM={(e) => {
                    console.log('>>>>>focus', e);
                }}
                className={styles.iframeStyle} src="https://dev-3860724.okta.com/oauth2/default/v1/authorize?grant_type=implicit&client_id=0oa3v6xaoQ15xbNqO5d6&response_type=token&state=12345&redirect_uri=http://127.0.0.1:8180/auth/realms/ORealm/broker/oidc/endpoint&grant_type=implicit&scope=openid profile email groups&nonce=123456" />
        </div>;
    }
}