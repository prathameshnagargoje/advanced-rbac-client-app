import * as React from 'react';
import JSONTree from 'react-json-tree';

export default class UserRolebaseContent extends React.Component {
    render(){
        return <div>{this.props.data && <JSONTree data={this.props.data} />}</div>;
    }
}