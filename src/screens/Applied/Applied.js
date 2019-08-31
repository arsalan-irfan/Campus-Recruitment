import React, { Component } from 'react'
import Navbar from '../../components/Navbar/StudentNavbar'
import Cards from '../../components/Card/JobCard'
import './Applied.css'
import { connect } from 'react-redux'

class Applied extends Component { 
  
  render() {
    let blockMsg = ""
    let block = null;
    if (this.props.currentUser.block) {
      blockMsg = "Note:You are blocked by admin so your profile will not be visible by companies and some features might be un available"
      block = (
        <div className="alert alert-warning mt-5 " role="alert">
          {blockMsg}
        </div>
      )
    }
    let appliedJobs = <h4 style={{color:"steelblue"}}>No Companies To Display</h4>
    if(this.props.currentUser.block){
      appliedJobs = <h3 style={{color:"red"}}>Applied Companies are unable to display in block mode</h3>   
    }
    
    else if (!this.props.currentUser.block && this.props.appliedCompany && this.props.appliedCompany.length > 0) {
      const { appliedCompany,profiles } = this.props
      appliedJobs = appliedCompany.map((job, index) => {
        let currentCompany=profiles.filter(company=>{
          return job.cid===company.uuid
        })
      console.log('Current Company',currentCompany)

        if (!currentCompany[0].block) {
          return <Cards key={index} data={job} />
        }
        else return null
      })
    }
    return (
      <div>
        <Navbar />
        <br/><br />
        <div>
          {block}
        </div>       
        <div className="container text-center mt-5">
          <div className="card-container">
            {appliedJobs}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser, appliedCompany,profiles } = state;
  return { currentUser, appliedCompany,profiles }
}

export default connect(mapStateToProps)(Applied);