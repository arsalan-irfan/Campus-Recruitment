import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CompanyImage from '../../../asset/company.png'
import { connect } from 'react-redux'
import { selectUser,setBlock } from '../../../store/actions/action'
import {withRouter} from 'react-router-dom'


class CompanyCard extends Component {
  

  onSelectUser = () => {
    const { user} = this.props;
    this.props.selectUser(user);
    this.props.history.replace(`/student/company/profile/${user.uuid}`)
  }
  onBlockPressed=()=>{
    const {uuid,block,type}=this.props.user;
    this.props.setBlock(type,uuid,block);
  }


  render() {
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
    let buttonTxt="Block"
    if(this.props.user.block)
        buttonTxt="UnBlock"
    return (
      <Card style={{maxWidth: 345,borderColor: "steelblue",borderWidth: 1,borderStyle: "solid"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.user.company}
            className={styles.media}
            height="140"
            image={CompanyImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.user.company}
            </Typography>
            <Typography component="p">
              <b>Owner:</b>{this.props.user.owner}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="medium" color="primary" variant="contained"
            onClick={this.onSelectUser}
          >
          View
        </Button>
        <Button size="medium" color="primary" variant="contained"
            onClick={this.onBlockPressed}
          >
            {buttonTxt}
        </Button>

        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps=state=>{
  const {currentUser} = state
  return{currentUser}
}

export default connect(mapStateToProps, { selectUser,setBlock })(withRouter(CompanyCard));