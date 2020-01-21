import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefaultAppBar from './DefaultAppBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function DefaulAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DefaultAppBar/>
    </div>
  );
}
