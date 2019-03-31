import React, { Component } from 'react'
import './Profile.css'
import Input from '../../../components/Input';
import { connect } from 'react-redux';
import Navbar from '../../../components/Navbar/StudentNavbar'
import { updateUser } from '../../../store/actions/action';
import { withStyles } from '@material-ui/core/styles';

const style = {
    box: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        borderColor: "blue",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        backgroundColor: "lightblue",
        marginTop: 20,
    }
}

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
        applied: this.props.currentUser.applied ? this.props.currentUser.applied : {},
        type: "Student",
        uuid: this.props.currentUser.uuid,
        block: this.props.currentUser.block,
        err: "",
        pass: true
    }

    setError = (err) => {
        this.setState({
            err
        })
    }

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onUpdatePressed = () => {
        //this.checkFields()
        const { firstname, lastname, institute, gpa,degree, email, applied, block, dob, initials, type, subject, uuid } = this.state
        if (firstname.length <= 15) {
            if (lastname.length <= 15) {
                if (gpa >= 0 && gpa <= 4) {
                    let bday = new Date(dob);
                    let today = new Date();
                    let diff = today.getFullYear() - bday.getFullYear();
                    if (diff >= 20) {
                        if (firstname && lastname && email &&  institute && gpa && dob && degree && subject && type) {
                            let data = {}
                            const { currentUser } = this.props
                            if (firstname === currentUser.firstname && lastname === currentUser.lastname && institute === currentUser.institute &&  degree === currentUser.degree &&gpa === currentUser.gpa && dob === currentUser.dob && subject === currentUser.subject) {
                                console.log("No changes is being made")
                                this.setState({
                                    err: "No changes is being made"
                                })
                            }
                            else {
                                this.setState({
                                    err: ""
                                })
                                data = { firstname, lastname, institute, email, applied, gpa, dob,degree, block, initials, type, subject, uuid }
                                updateUser(data, this.props.history);
                            }
                        }
                        else {
                            this.setState({
                                err: "Please fill all field"
                            })
                        }
                    }
                    else {
                        this.setError("Your age is not enough to update")
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

        console.log(this.state)

    }

    render() {
        const {classes}=this.props
        let errMsg = ""
        if (this.state.err) {
            errMsg = (
                <div className="alert alert-danger" role="alert">
                    <strong>{this.state.err}</strong>
                </div>
            )
        }
        return (
            <div>
                <Navbar />

                <div className="row "style={{marginTop:100}}>
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className={classes.box}>
                            <div className="heading">
                                <h3 className="text-center">{this.props.currentUser.firstname}'s Profile</h3>
                            </div>
                            <Input
                                type="text"
                                field="firstname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Firstname"
                                value={this.state.firstname}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="lastname"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Lastname"
                                value={this.state.lastname}
                                disable={false}
                            />

                            <Input
                                type="text"
                                field="degree"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Degree"
                                value={this.state.degree}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="subject"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Subject"
                                value={this.state.subject}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="institute"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Institute"
                                value={this.state.institute}
                                disable={false}
                            />
                            <Input
                                type="text"
                                field="gpa"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="GPA"
                                value={this.state.gpa}
                                disable={false}
                            />
                            <Input
                                type="date"
                                field="dob"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Date Of Birth"
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

const mapStateToProps = (state) => {
    const { currentUser } = state
    return { currentUser }
}

export default connect(mapStateToProps, { updateUser })(withStyles(style)(OwnProfile))