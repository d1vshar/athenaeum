import React from "react";
import Grid from "@material-ui/core/Grid";
import DefaultAppBar from "./DefaultAppBar";
import BookCard from "./BookCard";
import { Container } from "@material-ui/core";
const axios = require("axios").default;

const classes = {
  root: {
    flexGrow: 1
  }
};

class RootPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:9000/api/books").then(resp => {
      this.setState({
        isLoaded: true,
        data: resp.data
      });
      console.log(resp.data);
    });
  }

  render() {
    const { isLoaded, data } = this.state;
    if (!isLoaded) {
      return (
      <div className={classes.root}>
        <DefaultAppBar />
        <Container fixed></Container>
      </div>
      );
    } else {
      console.log("loaded");
      return (
        <div className={classes.root}>
          <DefaultAppBar />
          <Container fixed>
            <Grid container spacing={1}>
              {data.map(function(book) {
                return (
                  <Grid item md={4}>
                    <BookCard book={book}/>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

export default RootPage;
