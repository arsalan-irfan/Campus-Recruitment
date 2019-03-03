import React, { Component } from 'react'
import './Profile.css'
import Input from '../../../components/Input'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class ProfileView extends Component {
    
    
    render() {
       
        return (
            <div>
                <div className="row">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className="signup">
                            <div className="heading">
                                <h3 className="text-center">Company Profile</h3>
                            </div>

                            <Input
                                type="email"
                                field="email"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Email"
                                placeholder=""
                                value={this.props.selectedProfile.email}
                                disable={true}
                            />
                            
                            <Input
                                type="text"
                                field="company"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label=""
                                placeholder="Company"
                                value={this.props.selectedProfile.company}
                                disable={true}
                            />
                            <Input
                                type="text"
                                field="owner"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Owner"
                                placeholder=""
                                value={this.props.selectedProfile.owner}
                                disable={true}
                            />
                            <Input
                                type="number"
                                field="ntn"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="NTN"
                                placeholder=""
                                value={this.props.selectedProfile.ntn}
                                disable={true}
                            />
                            <Input
                                type="text"
                                field="business"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Business Type"
                                placeholder=""
                                value={this.props.selectedProfile.business}
                                disable={true}
                            />
                            <div className="btnGroup text-center">
                                <input type="button" className='btn btn-primary ' value="Back" style={{ width: "30%", marginRight: 10 }}
                                    onClick={()=>this.props.history.replace('/timeline/student')}
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
const mapStateToProps=state=>{
    const{selectedProfile} = state
    return {selectedProfile}
}
export default withRouter(connect(mapStateToProps)(withRouter(ProfileView)))