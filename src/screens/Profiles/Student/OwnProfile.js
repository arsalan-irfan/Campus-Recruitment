import React, { Component } from 'react'
import './Profile.css'
import Input from '../../../components/Input';
import { connect } from 'react-redux';
import Navbar from '../../../components/Navbar/StudentNavbar'
import { updateUser } from '../../../store/actions/action';
class OwnProfile extends Component {
    state = {
        firstname: this.props.currentUser.firstname,
        lastname: this.props.currentUser.lastname,
        email: this.props.currentUser.email,
        institute: this.props.currentUser.institute,
        gpa: this.props.currentUser.gpa,
        dob: this.props.currentUser.dob,
        initials: this.props.currentUser.initials,
        degree: this.props.currentUser.degree,
        subject: this.props.currentUser.subject,
        applied: this.props.currentUser.applied?this.props.currentUser.applied:{},
        type: "Student",
        uuid: this.props.currentUser.uuid,
        block: this.props.currentUser.block,
        err:"",
        pass:true
    }

    checkFields(){
        console.log("In Check Fields")
        const { firstname, lastname,institute,gpa, dob, degree, subject } = this.state;
        if (firstname && lastname && institute && gpa && dob && degree && subject ) {
            console.log("Fields Filled")
            this.setState({
                pass:true
            })
        }
        else{
            console.log("Field Empty")
            this.setState({
                pass:false
            })
        }
    }
    
    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onUpdatePressed=()=>{
        //this.checkFields()
        if(this.state.pass){
            const {firstname,lastname,institute,gpa,email,applied,block,dob,initials,type,subject,uuid} = this.state
            let data={}
            const {currentUser}=this.props
            if(firstname===currentUser.firstname&&lastname===currentUser.lastname&&institute===currentUser.institute&&gpa===currentUser.gpa&&dob===currentUser.dob&&subject===currentUser.subject){
                console.log("No changes is being made")
                this.setState({
                    err:"No changes is being made"
                })
            }
            else{
                this.setState({
                    err:""
                })
                data={firstname,lastname,institute,email,applied,gpa,dob,block,initials,type,subject,uuid}
                updateUser(data,this.props.history);
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

                <div className="row mt-5">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className="signup">
                            <div className="heading">
                                <h3 className="text-center">{this.props.currentUser.firstname}'s Profile</h3>
                            </div>
                            <Input
                                type="text"
                                field="firstname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Firstname"
                                placeholder="Enter Firstname"
                                value={this.state.firstname}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="lastname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Lastname"
                                placeholder="Enter Lastname"
                                value={this.state.lastname}
                                disable={false}
                            />
                            
                            <Input
                                type="text"
                                field="degree"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Degree"
                                placeholder="Degree"
                                value={this.state.degree}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="subject"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Subject"
                                placeholder="Subject"
                                value={this.state.subject}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="institute"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Institute"
                                placeholder="institute"
                                value={this.state.institute}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="gpa"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="GPA"
                                placeholder="GPA"
                                value={this.state.gpa}
                                disable={false}
                            />
                            <Input
                                type="date"
                                field="dob"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Date Of Birth"
                                placeholder="Date Of Birth"
                                value={this.state.dob}
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

const mapStateToProps=(state)=>{
    const {currentUser}=state
    return {currentUser}
}

export default connect(mapStateToProps,{updateUser})(OwnProfile)