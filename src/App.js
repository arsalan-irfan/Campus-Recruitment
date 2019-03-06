import React, { Component } from 'react';
import './App.css';

import {userAlreadySigned} from './store/actions/action'
import getRoutes from './Routes';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
class App extends Component {
  componentDidMount(){
    this.checkLoggedIn();
  }
  checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.props.userAlreadySigned(user,this.props.history);
    }
  };
  render() {
    let routes = getRoutes(this.props.status)
    return (
      <div>
           {routes}
      </div>

    );
  }
}

const mapStateToProps = state =>{
  const {status}=state;
  return {status}
}

export default withRouter(connect(mapStateToProps,{userAlreadySigned})(App));
