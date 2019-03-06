import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CompanyImage from '../../asset/company.png'
import { connect } from 'react-redux'
import { selectUser, applyCompany } from '../../store/actions/action'
import { withRouter } from 'react-router-dom'
import { isArray } from 'util';



class CompanyCard extends Component {
  onSelectUser = () => {
    const { data } = this.props;
    this.props.selectUser(data);
    this.props.history.replace(`/student/company/profile/${data.uuid}`)

  }
  onApply = (flag) => {
    let appliedCompany = []
    let applicants = []
    const { data, currentUser } = this.props;
    if (currentUser.applied) {
      appliedCompany = isArray(currentUser.applied) ? currentUser.applied : []
    }
    if (data.applicants) {
      applicants = isArray(data.applicants) ? data.applicants : []

    }
    if (flag === 1) {
      appliedCompany.push(data.uuid)
      applicants.push(currentUser.uuid)
    }
    if (flag === 2) {
      appliedCompany = currentUser.applied.filter(id => {
        return id !== data.uuid
      })
      if(data.applicants){
        applicants = data.applicants.filter(id => {
          return id !== currentUser.uuid
        })
    }
  }
  this.props.applyCompany(currentUser.uuid, data.uuid, appliedCompany, applicants);
  this.props.history.replace(`/student/timeline`)
}

  render() {
    console.log("-----------------------------------------------------")
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
    
    let applyBtn = { text: "Apply", flag: 1 }
    let temp = false;
    const {currentUser, data} = this.props;
    temp = currentUser.applied && isArray(currentUser.applied) ? currentUser.applied.find(apply => apply === data.uuid) : false;
    console.log(data.company+"In temp:"+temp)
    if (temp) {
      applyBtn = { text: "Un Apply", flag: 2 }
    }
    return (
      <Card style={{ maxWidth: 345, borderColor: "steelblue", borderWidth: 1, borderStyle: "solid" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.data.company}
            className={styles.media}
            height="140"
            image={CompanyImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.data.company}
            </Typography>
            <Typography component="p">
              <b>Owner:</b>{this.props.data.owner}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="medium" color="primary"
            onClick={this.onSelectUser}
          >
            View
        </Button>
          <Button size="medium" color="primary"
            onClick={() =>this.onApply(applyBtn.flag)}
            disabled={this.props.currentUser.block}
          >
            {applyBtn.text}
          </Button>

        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  const { currentUser } = state
  return { currentUser }
}

export default connect(mapStateToProps, { selectUser, applyCompany })(withRouter(CompanyCard));