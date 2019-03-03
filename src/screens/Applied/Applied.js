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
        console.log("as",result,profiles)
        this.props.appliedFetch(result,profiles)
      } 
  }
  render() {
    let blockMsg=""
    let block = null;
    if(this.props.currentUser.block){
      blockMsg="Note:You are blocked by admin so your profile will not be visible to Students and some features might be un available"
      block=(
        <div className="alert alert-warning mt-5 " role="alert">
              {blockMsg}
            </div>
      )
    }
    console.log("Applied"+this.props.appliedCompany)
    let displayProfiles = <h4 style={{color:"steelblue"}}>No Profiles To Display</h4>
    console.log(this.props.appliedCompany)
    if (this.props.appliedCompany && this.props.appliedCompany.length > 0) {
      const { appliedCompany } = this.props
      displayProfiles = appliedCompany.map((profile, index) => {
        if (!profile.block) {
          return <Cards key={index} data={profile} />
        }
        else return null
      })
    }
    console.log("here",displayProfiles);
    console.log("Applied Company", this.props.appliedCompany);
    return (
      <div>
        <Navbar />
        <br/><br />       
        <div style={{marginTop:100}}>
            {block}
        </div>
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