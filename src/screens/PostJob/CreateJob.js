import React, { Component } from 'react'
import Navbar from '../../components/Navbar/CompanyNavbar'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { onJobPost } from '../../store/actions/action'
import uid from 'uuid';

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});
class CreateJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            title: '',
            seats: 0,
            salary: 'unpaid',
            open: false,
            err: ''
        }
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    onHandleChange = (event) => {
        const field = event.target.id;
        const value = event.target.value;
        this.setState({
            [field]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const { description, title, seats, salary } = this.state

        if (description && title) {
            console.log(this.state)
            if (seats <= 0) {
                this.setState({
                    err: "Error In Number of Seats"
                })
            }
            else {
                this.setState({
                    description: '',
                    title: '',
                    seats: 0,
                    salary: 'unpaid',
                    err: '',
                    open: false
                })
                const { company, email, uuid } = this.props.currentUser
                var jobid = uid.v4();
                var cid = uuid;
                this.props.onJobPost({ title, description, seats, salary, jobid, company, email, cid })
                alert("Job Posted Successfully!")
            }

        }

        else {
            this.setState({
                err: "Some fields are empty"
            })
            console.log(this.state.err)
        }

    }

    onChangeTodoPriority = (e) => {
        this.setState({
            todo_priority: e.target.value
        });
    }

    render() {
        let blockMsg = ""
        let block = null;
        if(this.props.currentUser.block){
            blockMsg="Note:You are blocked by admin so your jobs will not be visible to Students and some features might be un available"
            block=(
              <div className="alert alert-warning mt-5 " role="alert">
                    {blockMsg}
                  </div>
            )
          }
        const { classes } = this.props;
        let errMsg = null
        const displayForm = <h3 style={{ color: "red" }}>Your Company is unable to post a job in block mode</h3>
        if (this.state.err) {
            errMsg = (
                <div className="alert alert-danger" role="alert">
                    {this.state.err}
                </div>
            )
        }
        return (
            <div >
                <Navbar />
                <div className="container" style={{ marginTop: "10%" }}>
                    {blockMsg}
                    {errMsg}
                    <h3>{this.props.currentUser.block?'':'Post New Job'}</h3>
                    {this.props.currentUser.block ? displayForm : (<form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Job Title: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={this.state.title}
                                onChange={this.onHandleChange}
                                maxLength="30"
                            />
                            <small style={{ color: 'red' }}>*Max length 40</small>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>

                            <textarea className="form-control" rows="5"
                                id="description"
                                value={this.state.description}
                                onChange={this.onHandleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Number of Seats: </label>
                            <input
                                type="number"
                                className="form-control"
                                id="seats"
                                value={this.state.seats}
                                onChange={this.onHandleChange}
                            />
                        </div>
                        <Button className={classes.button} onClick={this.handleOpen}>
                            Salary Range
                        </Button>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-controlled-open-select">salary</InputLabel>
                            <Select
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                value={this.state.salary}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'salary',
                                    id: 'demo-controlled-open-select',
                                }}
                            >
                                <MenuItem value="unpaid">Un Paid</MenuItem>
                                <MenuItem value="10k-30k">10k-30k</MenuItem>
                                <MenuItem value="30k-60k">30k-60k</MenuItem>
                                <MenuItem value="60k-80k">60k-80k</MenuItem>
                                <MenuItem value="80k-100k">80k-100k</MenuItem>
                                <MenuItem value="100k+">100k+</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="form-group">
                            <input type="submit" value="Submit Job" className="btn btn-primary" />
                        </div>
                    </form>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currentUser } = state;
    return { currentUser }
}

export default connect(mapStateToProps, { onJobPost })(withStyles(styles)(CreateJob))
