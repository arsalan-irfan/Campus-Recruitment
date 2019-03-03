import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = {
    purpleAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepPurple[500],
    },
  };
  
const NamedAvatar=(props)=> {
    const { classes } = props;
    return (
    <div>
      <Avatar className={classes.purpleAvatar}>{props.letters}</Avatar>
    </div>
  )
}
export default withStyles(styles)(NamedAvatar);