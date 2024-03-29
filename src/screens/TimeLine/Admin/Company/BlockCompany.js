import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../../../../components/Card/Admin/CompanyCard'
import Navbar from '../../../../components/Navbar/AdminNav'
import './style.css'
class BlockCompany extends Component {
    render() {
        const companies = this.props.companies.map((company,index) => {
            if (company.block) {
                return <Card user={company} key={index}/>
              }
              else return null
            })
        
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-10">
                        <div className="heading">
                            <h3 className="text-center">Blocked Company</h3>
                        </div>
                        <div className="card-container">
                            {companies}
                        </div>

                    </div>
                    <div className="col-1">

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { companies } = state;
    return { companies }
}

export default connect(mapStateToProps)(BlockCompany)