import React, { Component } from 'react'
import Navbar from '../../components/Navbar/StudentNavbar'
import './Student.css'
import { profileFetch } from '../../store/actions/action'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import JobCard from '../../components/Card/JobCard'

class Student extends Component {

  componentDidMount() {
    this.props.profileFetch("Company")
  }

  render() {
    let {uuid}=this.props.currentUser;
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
    let loading = (<Spinner />)
    let displayProfiles = ""
    let companyJobs = [];
    let displayJobs = ""
    if (this.props.profiles.length >= 0) {
      const { profiles } = this.props
      displayProfiles = profiles.map((profile, index) => {
        if (!profile.block) {
          if (profile.jobs) {
            for (let job in profile.jobs) {
              companyJobs.push(profile.jobs[job])
            }
            displayJobs = companyJobs.map((job, index) => {
              return <JobCard key={index} data={job} cid={profile.uuid} sid={uuid}/>
            })
          }
        }
        else return null
      })
      loading = null
    }
    return (
      <div>
        <Navbar />
        {loading}
        <div style={{ marginTop: 100 }}>
          {block}
        </div>

        <div className="container text-center">
          <div className="card-container">
            {displayJobs}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser, profiles } = state;
  return { currentUser, profiles }
}

export default connect(mapStateToProps, { profileFetch })(Student);