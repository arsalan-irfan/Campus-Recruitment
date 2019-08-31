import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StudentImage from '../../asset/studentCard.png'
import { connect } from 'react-redux'
import { selectUser } from '../../store/actions/action'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

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


class StudentCard extends Component {
  state = {
    currentStudentIndex: null
  }

  componentDidMount() {
    let currentStudentIndex = ''
    console.log('Hello')
    currentStudentIndex = this.props.profiles.filter(student => {
      // console.log('Comparision '+this.props.data.uuid+ ' === ' + student.uuid)
      return this.props.data.uuid === student.uuid
    })
    this.setState({
      currentStudentIndex:currentStudentIndex[0].block
    })

  }
  onSelectUser = () => {
    const { data } = this.props;
    this.props.selectUser(data);
    this.props.history.replace(`/company/student/profile/${data.uuid}`)
  }

  render() {
    const { classes, data, profiles } = this.props
    return ( 
      <div>
        {this.state.currentStudentIndex? null:(<Card className={classes.card}>
        {/* <Card className={classes.card}> */}
          <CardActionArea>
            <CardMedia
              component="img"
              alt={this.props.data.firstname}
              className={classes.media}
              height="140"
              image={StudentImage}
              title="Student"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.data.firstname} {this.props.data.lastname}
              </Typography>
              <Typography component="p">
                <b>Applied For:</b>{this.props.data.jobTitle}
              </Typography>

            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" style={{ textAlign: "center" }} variant="contained"
              onClick={this.onSelectUser}
            > View
        </Button>
          </CardActions>
        </Card>)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { profiles } = state;
  return { profiles }
}

export default connect(mapStateToProps, { selectUser })(withRouter(withStyles(styles)(StudentCard)));