import React, { Component } from 'react'
import Navbar from '../../components/Navbar/CompanyNavbar'
import Cards from '../../components/Card/StudentCard'
import './Applicants.css'
import { applicantsFetch } from '../../store/actions/action'
import { connect } from 'react-redux'


class Applicants extends Component { 
  componentDidMount(){
    this.applicantsCompanyFetch();  
  }
  applicantsCompanyFetch=()=>{
    const {currentUser,profiles}=this.props
    if(currentUser.applicants){
        const result = [];
        for(let id in currentUser.applicants){
          result.push(currentUser.applicants[id]);
        }
        this.props.applicantsFetch(result,profiles)
      } 
  }
  render() {
    console.log(this.props.companyApplicants)
    let displayProfiles = <h4 style={{color:"steelblue"}}>No Applicants To Display</h4>
    if(this.props.currentUser.block){
        displayProfiles = <h3 style={{color:"red"}}>Applicants are enable to display in block mode</h3>   
    }
    else if (this.props.companyApplicants && this.props.companyApplicants.length > 0) {
      const { companyApplicants } = this.props
      displayProfiles = companyApplicants.map((profile, index) => {
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
        <div className="container text-center mt-4">
          <div className="card-container">
            {displayProfiles}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser, companyApplicants,profiles } = state;
  return { currentUser, companyApplicants,profiles }
}

export default connect(mapStateToProps, { applicantsFetch })(Applicants);