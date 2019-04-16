import React, { Component } from 'react'
import {connect} from 'react-redux';
import CompanyNavbar from '../../components/Navbar/CompanyNavbar'
export class JobView extends Component {
  render() {
    const {title,seats,description,email,company,salary}=this.props.selectedJob
    return (
      <div>
        <CompanyNavbar />
    
        <div className='container' style={{marginTop:100}}>
            <h2 style={{color:'steelblue'}}>{title}</h2>
            <p style={{fontSize:20}}><span style={{fontWeight:"bold",color:'steelblue'}}>Company: </span>{company}</p>
            <p style={{fontSize:20}}><span style={{fontWeight:"bold",color:'steelblue'}}>Apply At: </span>{email}</p>
            <p style={{fontSize:20}}><span style={{fontWeight:"bold",color:'steelblue'}}>Seats: </span>{seats}</p>
            <p style={{fontSize:20}}><span style={{fontWeight:"bold",color:'steelblue'}}>Salary: </span>{salary}</p>
            <h4 style={{fontWeight:"bold",color:'steelblue'}}>
            description:
            </h4>
            <div className='container'>
                <p>{description}</p>
            </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps=state=>{
    const {selectedJob} = state;
    return {selectedJob} 
}

export default connect(mapStateToProps)(JobView)
