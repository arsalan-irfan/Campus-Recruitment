import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
// import { withStyles } from ''
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StudentImage from '../../../asset/studentCard.png'
import { connect } from 'react-redux'
import { selectUser,setBlock } from '../../../store/actions/action'
import {withRouter} from 'react-router-dom';

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

class StudentCard extends Component {

  onSelectUser = () => {
    const { user} = this.props;
    this.props.selectUser(user);
    this.props.history.replace(`/company/student/profile/${user.uuid}`)
  }
  onBlockPressed=()=>{
    const {uuid,block,type}=this.props.user;
    this.props.setBlock(type,uuid,block);
  }


  render() {
    // const {block,firstname,lastname } = this.props.user;
    let buttonTxt="Block"
    console.log(this.props)
    if(this.props.user.block)
        buttonTxt="UnBlock"
    return (
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.user.firstname}
            className={styles.media}
            height="140"
            image={StudentImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.user.firstname} {this.props.user.lastname}
            </Typography>
            <Typography component="p">
              <b>GPA:</b>{this.props.user.gpa}
            </Typography>
            <Typography component="p">
              <b>Degree:</b>{this.props.user.degree}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="medium" color="primary"
            onClick={this.onSelectUser}
        >
          View
        </Button>
          <Button size="small" color="primary" style={{ textAlign: "center" }}
            onClick={this.onBlockPressed}
          > {buttonTxt}
        </Button>
        </CardActions>
      </Card>
    );
  }
}


export default connect(null, { selectUser,setBlock })(withRouter(StudentCard));