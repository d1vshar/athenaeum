import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import AppDrawerContent from "./AppDrawerContent";
import NewBookModal from "./NewBookModal";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  sideBarTitle: {
    padding: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

export default function DefaulAppBar() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: false
  });

  const toggleDrawer = status => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ open: status });
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <AppDrawerContent></AppDrawerContent>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            athenaeum
          </Typography>
          <NewBookModal></NewBookModal>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={state.open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
}
