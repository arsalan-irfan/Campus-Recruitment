import React, { Component } from 'react'
import './Profile.css'
import Input from '../../../components/Input'
import {connect} from 'react-redux'
import {updateUser} from '../../../store/actions/action'
import Navbar from '../../../components/Navbar/CompanyNavbar'
class OwnProfile extends Component {
    
    state = {
        email: this.props.currentUser.email,
        initials: this.props.currentUser.initials,
        owner: this.props.currentUser.owner,
        ntn: this.props.currentUser.ntn,
        applicants:this.props.currentUser.applicants?this.props.currentUser.applicants:{} ,
        company: this.props.currentUser.company,
        type: "Company",
        business: this.props.currentUser.business,
        block: this.props.currentUser.block,
        uuid:this.props.currentUser.uuid,
        err:"",
        pass:true
    }
    
    checkFields=()=>{
        const { company, owner,  ntn, business } = this.state;
        if (company && owner && ntn && business) {
            this.setState({
                pass:true
            })
        }
    
    }
    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }
    
    onUpdatePressed=()=>{
        //this.checkFields();
        if(this.state.pass){
            const{company,owner,ntn,business,initials,uuid,applicants,block,type} = this.state;
            const{currentUser} = this.props
            if(company===currentUser.company&&owner===currentUser.owner&&ntn===currentUser.ntn&&business===currentUser.business){
                this.setState({
                    err:"No changes is being made"
                })
            }
            else{
                this.setState({
                    err:""
                })
                let data={company,owner,ntn,business,initials,uuid,applicants,block,type}
                updateUser(data,this.props.history)
            }
        }
        else{
            this.setState({
                err:"Some fields are empty!"
            })
        }
    }
    render() {
        let errMsg = ""
        if (this.state.err) {
            errMsg = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{this.state.err}</strong>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        return (
            <div>
                <Navbar />
                <div className="row mt-2">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className="signup">
                            <div className="heading">
                                <h3 className="text-center">{this.state.company} Profile</h3>
                            </div>

                            <Input
                                type="text"
                                field="company"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Company Name"
                                placeholder="Company"
                                value={this.state.company}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="owner"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Owner"
                                placeholder="Owner"
                                value={this.state.owner}
                                disable={false}
                            />
                            <Input
                                type="number"
                                field="ntn"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="NTN"
                                placeholder="NTN"
                                value={this.state.ntn}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="business"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Business Type"
                                placeholder="type"
                                value={this.state.business}
                                disable={false}
                            />
                            {errMsg}
                            <div className="btnGroup text-center">
                                <input type="button" className='btn btn-primary ' value="Update" style={{ width: "30%", marginRight: 10 }}
                                    onClick={this.onUpdatePressed}
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
    const{currentUser} = state
    return {currentUser}
}
export default connect(mapStateToProps,{updateUser})(OwnProfile)