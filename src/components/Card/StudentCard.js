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
import {withRouter} from 'react-router-dom'

class StudentCard extends Component {

  onSelectUser = () => {
    const { data} = this.props;
    this.props.selectUser(data);
    this.props.history.replace(`/company/student/profile/${data.uuid}`)
  }

  render() {
    const styles = {

      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
    };

    return (
      <Card style={{maxWidth: 345,borderColor: "steelblue",borderWidth: 1,borderStyle: "solid"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.data.firstname}
            className={styles.media}
            height="140"
            image={StudentImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.data.firstname} {this.props.data.lastname}
            </Typography>
            <Typography component="p">
              <b>GPA:</b>{this.props.data.gpa}
            </Typography>
            <Typography component="p">
              <b>Degree:</b>{this.props.data.degree}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" style={{ textAlign: "center" }}
            onClick={this.onSelectUser}
          > View
        </Button>
        </CardActions>
      </Card>
    );
  }
}


export default connect(null, { selectUser })(withRouter(StudentCard));