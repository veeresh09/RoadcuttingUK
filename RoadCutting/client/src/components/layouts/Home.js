import React, { Component } from 'react'
import Landing from './Landing';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
  }

  handleSuccesfulAuth() {
    this.props.history.push("/dashboard");
  }
  render() {
    return (
      <div>
        <center>
          <Landing handleSuccesfulAuth={this.handleSuccesfulAuth} />
        </center>
      </div>
    )
  }
}
