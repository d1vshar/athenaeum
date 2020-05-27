import React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BallotIcon from "@material-ui/icons/Ballot";

const classes = {
  sideBarTitle: {
    padding: "16px"
  }
};
class AppDrawer extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h6" style={classes.sideBarTitle}>
          athenaeum
        </Typography>
        <Divider />
        <List>
          <ListItem button key={"Search"}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search"} />
          </ListItem>
          <ListItem button key={"Voting Portal"}>
            <ListItemIcon>
              <BallotIcon />
            </ListItemIcon>
            <ListItemText primary={"Voting Portal"} />
          </ListItem>
        </List>
      </>
    );
  }
}

export default AppDrawer;
