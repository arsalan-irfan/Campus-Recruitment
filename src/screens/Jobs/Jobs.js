import React, { Component } from 'react'
import Navbar from '../../components/Navbar/CompanyNavbar'
import Cards from '../../components/Card/JobCard'
import './Jobs.css'
import { connect } from 'react-redux'

class Company extends Component {

    render() {
        let blockMsg = ""
        let block = null
        let displayJobs = ""
        if (this.props.currentUser.block) {
            blockMsg = "Note:You are blocked by admin so your profile will not be visible to Students and some features might be un available"
            block = (
                <div className="alert alert-warning mt-5 " role="alert">
                    {blockMsg}
                </div>
            )
        }
        let companyJobs=[]
        if(this.props.currentUser.jobs){
            const { jobs } = this.props.currentUser
            for (let job in jobs) {
                companyJobs.push(jobs[job])
            }
        }
        if (companyJobs) {
            displayJobs = companyJobs.map((job, index) => {
                return <Cards key={index} data={job} />
            })
        }
        console.log("Company Jobs ",companyJobs)
        return (
            <div>
                <Navbar />
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
    const { currentUser } = state;
    return { currentUser }
}

export default connect(mapStateToProps)(Company);