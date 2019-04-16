import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import JobImage from '../../asset/job.jpg'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {selectJob,deleteJob} from '../../store/actions/action'
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

  onSelectJob = () => {
    const { data} = this.props;
    this.props.selectJob(data);
    this.props.history.replace(`/job/view/${data.jobid}`)
  }
  onDeleteJob=()=>{
    const {data}=this.props;
    let currentJobs=[];
    const { jobs,uuid } = this.props.currentUser
    for (let job in jobs) {
      currentJobs.push(jobs[job])
    }
    console.log(currentJobs)
    deleteJob(currentJobs,uuid,data.jobid)
  }
  render() {
    const {classes}=this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.data.title}
            className={classes.media}
            height="140"
            image={JobImage}
            title="Job"          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.data.title}
            </Typography>            
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" style={{ textAlign: "center" }} variant="contained"
            onClick={this.onSelectJob}
          > View
        </Button>
        <Button size="small" color="secondary" style={{ textAlign: "center" }} variant="contained"
        onClick={this.onDeleteJob}
        > Delete
        </Button>
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const { currentUser } = state;
  return { currentUser }
}
export default connect(mapStateToProps, { selectJob,deleteJob })(withRouter(withStyles(styles)(JobCard)));