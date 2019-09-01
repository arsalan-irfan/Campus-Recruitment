import React, { Component } from 'react'
import './Signup.css'
import Input from '../../../components/Input';
import { connect } from 'react-redux';
import { createuser } from '../../../store/actions/action'
import Spinner from '../../../components/Spinner/Spinner2'
import { withStyles } from '@material-ui/core/styles';

const style = {
    signupBox: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        borderColor: "blue",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        backgroundColor: "lightblue",
        marginTop: 20,
    },
    mainHeading:{
        color:"white",
        backgroundColor: "steelblue",
        borderColor:"black" ,
        borderWidth: 1,
        borderStyle: "solid",
        width:"auto",
        textAlign:"center",
        fontWeight: "bold",
        marginBottom: 10,
    }
}

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
        err: '',
        pass: true

    }


    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }
    setError = (err) => {
        this.setState({
            err
        })
    }
    onSubmitHandler = () => {
        const { firstname, lastname, email, password, cpassword, institute, initials, gpa, dob, degree, subject, applied, type, block } = this.state;
        if (firstname.length <= 15) {
            if (lastname.length <= 15) {
                if (gpa >= 0 && gpa <= 4) {
                    let bday = new Date(dob);
                    let today = new Date();
                    let diff = today.getFullYear() - bday.getFullYear();
                    if (diff >= 20) {
                        if (firstname && lastname && email && password && institute && gpa && dob && degree && subject && type) {
                            if (password === cpassword) {
                                this.setState({
                                    err: ""
                                })
                                let data = { firstname, lastname, email, institute, gpa, dob, degree, initials, subject, applied, type, block }
                                this.props.createuser(data, this.props.history, password)
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
                    else {
                        this.setError("Your age is not enough to sign up")
                    }
                }
                else {
                    this.setError("Enter Valid GPA")
                }
            }
            else {
                console.log(lastname.length)
                this.setError("Maximum length of lastname should be 15 characters")
            }
        }
        else {
            console.log(firstname.length)
            this.setError("Maximum length of firstname should be 15 characters")
        }

    }
    render() {
        const {classes}=this.props
        let errMsg = ""
        let displayButton = (
            <div className="btnGroup">
                <input type="button" className='btn btn-primary  btn-lg' value="Signup" 
                    onClick={this.onSubmitHandler}
                />
                <input type="button" className='btn btn-primary btn-lg ' value="Back" style={{marginLeft:20}} 
                    onClick={()=>{this.props.history.replace('/signin')}}
                />
            </div>
        )
        if (this.props.loading) {
            displayButton = <Spinner />
        }
        if (this.state.err) {
            errMsg = (
                <div className="alert alert-danger" role="alert">
                    <strong>{this.state.err}</strong>
                </div>
            )
        }
        else if (this.props.error) {
            errMsg = (
                <div className="alert alert-danger" role="alert">
                    <strong>{this.props.error}</strong>
                </div>

            )
        }
        return (
            <div>
                <div className={classes.mainHeading}>
                    <h1>Campus Recruitment</h1>
                </div>
                <div className="row">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className={classes.signupBox}>
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
                                maxlength="15"
                            />
                            <Input
                                type="text"
                                field="lastname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Lastname"
                                placeholder="Enter Lastname"
                                maxlength="15"
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
                                type="number"
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
                            {displayButton}
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
    const { error, loading } = state
    return { error, loading }
}

export default connect(mapStateToProps, { createuser })(withStyles(style)(Signup))