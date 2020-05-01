import React, { Component } from 'react'
import Landing from './Landing';
//This is main componenet which opens as soon as website loads
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
  }

  handleSuccesfulAuth() {
    this.props.history.push("/dashboard");//redirecting to dahboard after sucesful login
  }
  render() {
    return (
      <div>
        <center>
          <Landing handleSuccesfulAuth={this.handleSuccesfulAuth} />
          {/* Login Component */}
        </center>
      </div>
    )
  }
}