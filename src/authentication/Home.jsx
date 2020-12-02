/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Home extends Component {
  render() {
    // console.log(this.props);
    if (this.props.user) {
      return (
        <div className='container'>
          <h2>hi {this.props.user.name}</h2>
        </div>
      );
    }

    // return <Redirect to='/login' />;
    return <h2>hi </h2>;
  }
}
export default Home;
