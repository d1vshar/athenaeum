import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import AppDrawerContent from "./AppDrawerContent";
import NewBookModal from "./NewBookModal";

class DefaultAppBar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  toggleDrawer = (status) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ open: status });
  };

  sideList = () => (
    <div
      className="sideBarlist"
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <AppDrawerContent></AppDrawerContent>
    </div>
  );

  render() {
    const { open } = this.state;
    return (
      <div className="appBarRoot">
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="appBarTitle">
              athenaeum
            </Typography>
            <NewBookModal></NewBookModal>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={open}
          onOpen={this.toggleDrawer(true)}
          onClose={this.toggleDrawer(false)}
        >
          {this.sideList()}
        </SwipeableDrawer>
      </div>
    );
  }
}

export default DefaultAppBar;