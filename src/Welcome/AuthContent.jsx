import * as React from 'react';
import JSONTree from 'react-json-tree';

export default class AuthContent extends React.Component {

  render() {
    return (
      <div className="row">
        <div>
          {this.props.user && <JSONTree data={this.props.user} />}
          {this.props.api && <JSONTree data={this.props.api} />}
        </div>
      </div>
    );
  }
}
