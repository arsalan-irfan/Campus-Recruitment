import React from 'react'
import './Navbar.css'
import Avatar from '../NamedAvatar'
import {signOut} from '../../store/actions/action'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const companyNavbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top justify-content-between">
      <div className="navbar-brand" >Campus Recruitment</div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" activeStyle={{ color: 'white',fontWeight:"bold" }} to="/timeline/company">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeStyle={{ color: 'white',fontWeight:"bold" }} to="/company/profile">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeStyle={{ color: 'white',fontWeight:"bold" }} to="/timeline/company">Applicants</NavLink>
          </li>
        </ul>
        <div className="nav-item">
          <span>{props.currentUser.company}</span>
        </div>
        <div className="nav-item">
          <Avatar letters={props.currentUser.initials}/>
        </div>
        <button className="btn btn-warning my-2 my-sm-0" 
        onClick={()=>{props.signOut()}}>
        Logout</button>
      </div>
    </nav>
  )
}
const mapStateToProps=state=>{
  const {currentUser} = state
  return {currentUser}
}
export default connect(mapStateToProps,{signOut})(companyNavbar);
