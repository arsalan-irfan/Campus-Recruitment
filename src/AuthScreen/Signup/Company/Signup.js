import React, { Component } from 'react'
import './Signup.css'
import Input from '../../../components/Input'
import { createuser } from '../../../store/actions/action'
import { connect } from 'react-redux'
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
        email: "",
        password: "",
        cpassword: "",
        initials: "",
        owner: "",
        ntn: "",
        applicants: "",
        accepted: "",
        company: '',
        type: "Company",
        business: "",
        block: false,
        err: ""
    }
    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }
    onSubmitHandler = () => {
        const { company, email, password, cpassword, owner, initials, ntn, applicants, accepted, business, type, block } = this.state;
        if (company && email && password && cpassword && owner && ntn && business) {
            if (company.length < 20) {
                if (password === cpassword) {
                    this.setState({
                        err: ""
                    })
                    let data = { company, email, ntn, applicants, initials, owner, business, accepted, type, block }
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
                    err: "Maximum length of Company's name should be 20 characters"
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
        console.log(this.props.error)
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
        else if (this.props.error) {
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
                <div className={classes.mainHeading}>
                    <h1>Campus Recruitment</h1>
                </div>
                <div className="row">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className={classes.signupBox}>
                            <div className="heading">
                                <h3 className="text-center">Company Signup</h3>
                            </div>

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
                                field="company"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Company Name"
                                placeholder="Company"
                                maxLength='30'
                            />
                            <Input
                                type="text"
                                field="owner"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Owner"
                                placeholder="Owner"
                            />
                            <Input
                                type="number"
                                field="ntn"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="NTN"
                                placeholder="NTN"
                            />
                            <Input
                                type="text"
                                field="business"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Business Type"
                                placeholder="type"
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