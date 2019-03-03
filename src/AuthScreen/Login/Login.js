import React, { Component } from 'react'
import './Login.css'
import Avatar from '@material-ui/core/Avatar';
import StudentImg from '../../asset/student.png';
import CompanyImg from '../../asset/company.png'
import Input from '../../components/Input'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/action'
import Spinner from '../../components/Spinner/Spinner'

class Login extends Component {
    state = {
        email: "zain123@gmail.com",
        password: "password"
    }
    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onLoginPressed = () => {
        const { email, password } = this.state;
        const { loginUser, history } = this.props;
        loginUser(email, password, history);

    }

    render() {
        let disableStatus = true;
        let errMsg = null

        if (this.props.error) {
            errMsg = (
                <div className="alert alert-danger" role="alert">
                    {this.props.error}    
                </div>
            )
        }
        const { email, password } = this.state;
        if (email !== "" && password !== "")
            disableStatus = false
        return (
            <div>
                <div className="mainHeading">
                    <h1>Campus Recruitment</h1>
                </div>
                <div className="row">
                    <div className='col-2'>
                    </div>
                    <div className='col-8'>
                        <div className="login">
                            <div className="heading">
                                <h2 className="text-center">SignIn</h2>
                            </div>
                            <Input
                                type="email"
                                field="email"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Email"
                                placeholder="Enter Email"
                                value={this.state.email}

                            />
                            <Input
                                type="password"
                                field="password"
                                styleInput="form-control inputStyle"
                                onChange={this.onHandleChange}
                                label="Password"
                                placeholder="Enter Password"
                                value={this.state.password}
                            />
                            {errMsg}
                            <div className="btnGroup">
                            {(!this.props.loading
                            ?(
                                <input type="button"
                                className='btn btn-primary'
                                value="Signin" style={{ width: "30%", }}
                                disabled={disableStatus}
                                onClick={this.onLoginPressed}
                            />
                            )
                            :(<Spinner />)
                            )}

                            </div>
                            <hr />
                            <div>
                                <h3 style={{ color: "steelblue", fontWeight: "bold", borderTopWidth: 1, borderTopColor: "grey", borderTopStyle: "solid", paddingTop: 10, }}>
                                    Signup As:
                                </h3>

                            </div>
                            <div className="signupBtn">
                                <p style={{ width: "20%", color: "blue", fontWeight: "bold", marginLeft: "17%", fontSize: 20 }}>Student</p>
                                <p style={{ width: "20%", color: "blue", fontWeight: "bold", marginLeft: "17%", fontSize: 20 }}>Company</p>
                            </div>
                            <div className="signupBtn ">
                                <Link to="/signup/student">

                                    <Avatar alt="Student" src={StudentImg} style={{ width: "70%", height: "70%", marginLeft: "20%" }} />

                                </Link>
                                <Link to="/signup/company">
                                    <Avatar alt="Teacher" src={CompanyImg} style={{ width: "70%", height: "70%", }} />
                                </Link>

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
    const { loading, error } = state;
    return { loading, error }
}

export default connect(mapStateToProps, { loginUser })(Login)