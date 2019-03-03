import React, { Component } from 'react'
import './Signup.css'
import Input from '../../../components/Input';
import { connect } from 'react-redux';
import { createuser } from '../../../store/actions/action'
class Signup extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
        institute: "",
        gpa: "",
        dob: "",
        initials: "",
        degree: "",
        subject: "",
        applied: "",
        type: "Student",
        uid: '',
        block: false,
        err: ''

    }
    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }
    onSubmitHandler = () => {
        const { firstname, lastname, email, password, cpassword, institute, initials, gpa, dob, degree, subject, applied, type, block } = this.state;
        if (firstname && lastname && email && password && institute && gpa && dob && degree && subject && type) {
            if (password === cpassword) {
                this.setState({
                    err: ""
                })
                let data = { firstname, lastname, email,  institute, gpa, dob, degree, initials, subject, applied, type, block }
                this.props.createuser(data,this.props.history,password)
            }
            else {
                this.setState({
                    err: "passwords doesn't matched"
                })
            }
        }
        else {
            this.setState({
                err: "Please fill all field"
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
        else if(this.props.error) {
            errMsg = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{this.props.error}</strong>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        return (
            <div>
                <div className="row">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className="signup">
                            <div className="heading">
                                <h3 className="text-center">Student Signup</h3>
                            </div>
                            <Input
                                type="text"
                                field="firstname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Firstname"
                                placeholder="Enter Firstname"
                            />
                            <Input
                                type="text"
                                field="lastname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Lastname"
                                placeholder="Enter Lastname"
                            />
                            <Input
                                type="email"
                                field="email"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Email"
                                placeholder="Enter Email"
                            />
                            <Input
                                type="password"
                                field="password"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Password"
                                placeholder="Enter Password"
                            />
                            <Input
                                type="password"
                                field="cpassword"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Confirm Password"
                                placeholder="Confirm Password"
                            />
                            <Input
                                type="text"
                                field="degree"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Degree"
                                placeholder="Degree"
                            />
                            <Input
                                type="text"
                                field="subject"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Subject"
                                placeholder="Subject"
                            />
                            <Input
                                type="text"
                                field="institute"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Institute"
                                placeholder="institute"
                            />
                            <Input
                                type="text"
                                field="gpa"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="GPA"
                                placeholder="GPA"
                            />
                            <Input
                                type="date"
                                field="dob"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Date Of Birth"
                                placeholder="Date Of Birth"
                            />
                            {errMsg}
                            <div className="btnGroup">
                                <input type="button" className='btn btn-primary ' value="Signup" style={{ width: "30%", marginRight: 10 }}
                                    onClick={this.onSubmitHandler}
                                />
                                <input type="button" className='btn btn-primary ' value="Back" style={{ width: "30%", }}
                                    onClick={this.onSubmitHandler}
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
    const {error}=state
    return {error}
}

export default connect(mapStateToProps, { createuser })(Signup)