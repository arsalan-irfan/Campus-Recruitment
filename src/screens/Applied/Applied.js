import React, { Component } from 'react'
import Navbar from '../../components/Navbar/StudentNavbar'
import Cards from '../../components/Card/CompanyCard'
import './Applied.css'
import { appliedFetch } from '../../store/actions/action'
import { connect } from 'react-redux'


class Applied extends Component { 
  componentDidMount(){
    this.applyCompanyFetch();  
  }
  applyCompanyFetch=()=>{
    const {currentUser,profiles}=this.props
    if(currentUser.applied){
        const result = [];
        for(let id in currentUser.applied){
          result.push(currentUser.applied[id]);
        }
        this.props.appliedFetch(result,profiles)
      } 
  }
  render() {
    let displayProfiles = <h4 style={{color:"steelblue"}}>No Companies To Display</h4>
    if(this.props.currentUser.block){
      displayProfiles = <h3 style={{color:"red"}}>Applied Companies are enable to display in block mode</h3>   
    }
    
    if (this.props.appliedCompany && this.props.appliedCompany.length > 0) {
      const { appliedCompany } = this.props
      displayProfiles = appliedCompany.map((profile, index) => {
        if (!profile.block) {
          return <Cards key={index} data={profile} />
        }
        else return null
      })
    }
    return (
      <div>
        <Navbar />
        <br/><br />       
        <div className="container text-center">
          <div className="card-container">
            {displayProfiles}
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

export default connect(mapStateToProps, { appliedFetch })(Applied);