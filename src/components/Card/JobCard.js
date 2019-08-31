import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import JobImage from '../../asset/job.jpg'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { selectJob, deleteJob, applyCompany } from '../../store/actions/action'
const styles = {
  card: {
    maxWidth: 345,
    borderColor: "steelblue",
    borderWidth: 1,
    borderStyle: "solid"
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


class JobCard extends Component {

  onApplyJob = async () => {
    const { degree, dob, email, firstname, lastname, gpa, initials, institute, subject, type, uuid } = this.props.currentUser
    let { sid, data, appliedCompany,profiles,currentUser} = this.props;
    let applicants=[];
    let index;
    let currentCompany=profiles.filter(company=>{
      return data.cid===company.uuid
    })
    if(currentCompany[0].applicants){
      applicants=currentCompany[0].applicants
      console.log(applicants)
      //   for (let profile in currentCompany[0].applicants) {
    //     applicants.push(currentCompany[0].applicants[profile])
    //     console.log('Applicants'+applicants);
    // }
  }
    
    if (appliedCompany) {
      index = appliedCompany.findIndex(job => {
        console.log(job.jobid + '===' + data.jobid)
        return job.jobid === data.jobid
      })
    }
    if (index === -1) {
      let jobTitle = data.title;
      let jobid=data.jobid;
      let studentData = { degree, dob, email, firstname, lastname, gpa, initials, institute, subject, type, uuid, jobTitle,jobid }
      applicants.push(studentData);
      appliedCompany.push(data);
      await this.props.applyCompany(sid, data.cid, appliedCompany, applicants);
    }
    else{
      appliedCompany=appliedCompany.filter(job=>{
        return job.jobid!==data.jobid
      })
      applicants=applicants.filter(profile=>{
        return profile.jobid !== data.jobid && currentUser.uuid === profile.uuid
      })
      await this.props.applyCompany(sid, data.cid, appliedCompany, applicants);
      
    }
  }
  onSelectJob = () => {
    const { data } = this.props;
    this.props.selectJob(data);
    this.props.history.replace(`/job/view/${data.jobid}`)
  }
  onDeleteJob = () => {
    const { data } = this.props;
    let currentJobs = [];
    const { jobs, uuid } = this.props.currentUser
    for (let job in jobs) {
      currentJobs.push(jobs[job])
    }
    console.log(currentJobs)
    deleteJob(currentJobs, uuid, data.jobid)
  }
  render() {
    let disableBtn=false
    const { appliedCompany, data, currentUser } = this.props;
    const userType = currentUser.type
    if(userType==='Student'&&currentUser.block){
      disableBtn=true 
    }
    let index = '';
    let secondBtn = ''
    if (userType === 'Student') {
      if (appliedCompany) {
        index = appliedCompany.findIndex(job => {
          return job.jobid === data.jobid
        })
      }
      secondBtn = index === -1 ? 'Apply' : 'Un Apply';
      //secondBtn='Apply'

    }
    else {
      secondBtn = 'Delete'
    }
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.data.title}
            className={classes.media}
            height="140"
            image={JobImage}
            title="Job" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h3">
              Company:{this.props.data.company}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" style={{ textAlign: "center" }} variant="contained"
            onClick={this.onSelectJob}
            disabled={disableBtn}
          > View
        </Button>
          <Button size="small" color="secondary" style={{ textAlign: "center" }} variant="contained"
            onClick={userType === 'Company' ? this.onDeleteJob : this.onApplyJob}
            disabled={disableBtn}
          > {secondBtn}
          </Button>
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const { currentUser, appliedCompany,profiles } = state;
  return { currentUser, appliedCompany,profiles }
}
export default connect(mapStateToProps, { selectJob, deleteJob, applyCompany })(withRouter(withStyles(styles)(JobCard)));