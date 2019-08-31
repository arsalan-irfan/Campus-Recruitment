import React, { Component } from 'react'
import Navbar from '../../components/Navbar/CompanyNavbar'
import Cards from '../../components/Card/StudentCard'
import './Student.css'
import { profileFetch } from '../../store/actions/action'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'

class Company extends Component {

  componentDidMount() {
    this.props.profileFetch("Student")
  }

  render() {
    let blockMsg = ""
    let block = null
    // let loading = (this.props.profiles?null:<Spinner />)
    let displayProfiles = <Spinner />
    if (this.props.currentUser.block) {
      displayProfiles = <h3 style={{ color: "red" }}>Applicants are enable to display in block mode</h3>
    }
    if (this.props.currentUser.block) {
      blockMsg = "Note:You are blocked by admin so your jobs will not be visible to Students and some features might be un available"
      block = (
        <div className="alert alert-warning mt-5 " role="alert">
          {blockMsg}
        </div>
      )
    }
    if (!this.props.currentUser.block && this.props.companyApplicants && this.props.companyApplicants.length >= 0 && this.props.profiles && this.props.profiles.length > 0) {
      const { companyApplicants } = this.props;
      if (companyApplicants && companyApplicants.length > 0) {
        displayProfiles = companyApplicants.map((profile, index) => {
          return <Cards key={index} data={profile} />
        })
      }
      else {
        displayProfiles = <h4 style={{ color: "steelblue" }}>No Applicants To Display</h4>

      }
    }
    console.log(displayProfiles.length)
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: 100 }}>
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
  const { currentUser, companyApplicants, profiles } = state;
  return { currentUser, companyApplicants, profiles }
}

export default connect(mapStateToProps, { profileFetch })(Company);