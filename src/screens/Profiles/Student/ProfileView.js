import React, { Component } from 'react'
import './Profile.css'
import Input from '../../../components/Input';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class ProfileView extends Component {

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className="signup">
                            <div className="heading">
                                <h3 className="text-center">Student Profile</h3>
                            </div>
                            <Input
                                type="text"
                                field="firstname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Firstname"
                                placeholder="Enter Firstname"
                                value={this.props.selectedProfile.firstname}
                                disable={true}
                            />
                            <Input
                                type="text"
                                field="lastname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Lastname"
                                placeholder="Enter Lastname"
                                value={this.props.selectedProfile.lastname}
                                disable={true}
                            />
                            <Input
                                type="email"
                                field="email"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Email"
                                placeholder="Enter Email"
                                value={this.props.selectedProfile.email}
                                disable={true}
                            />

                            <Input
                                type="text"
                                field="degree"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Degree"
                                placeholder="Degree"
                                value={this.props.selectedProfile.degree}
                                disable={true}
                            />
                            <Input
                                type="text"
                                field="subject"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Subject"
                                placeholder="Subject"
                                value={this.props.selectedProfile.subject}
                                disable={true}
                            />
                            <Input
                                type="text"
                                field="institute"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Institute"
                                placeholder="institute"
                                value={this.props.selectedProfile.institute}
                                disable={true}
                            />
                            <Input
                                type="text"
                                field="gpa"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="GPA"
                                placeholder="GPA"
                                value={this.props.selectedProfile.gpa}
                                disable={true}
                            />
                            <Input
                                type="date"
                                field="dob"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Date Of Birth"
                                placeholder="Date Of Birth"
                                value={this.props.selectedProfile.dob}
                                disable={true}
                            />
                            <div className="btnGroup text-center">
                                <input type="button" className='btn btn-primary ' value="Back" style={{ width: "30%", marginRight: 10 }}
                                    onClick={()=>this.props.history.replace('/timeline/company')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-2'>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectedProfile } = state
    return { selectedProfile }
}
export default connect(mapStateToProps)(withRouter(ProfileView))