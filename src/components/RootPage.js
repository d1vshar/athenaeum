import React from "react";
import Grid from "@material-ui/core/Grid";
import DarkAppBar from "./DarkAppBar";
import BookCard from "./BookCard";
import { Container } from "@material-ui/core";

const axios = require("axios").default;

class RootPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    axios.get("/api/voting/").then(resp => {
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
      <div className="appRoot">
        <DarkAppBar />
        <Container fixed></Container>
        
      </div>
      );
    } else {
      console.log("loaded");
      return (
        <div className="appRoot">
          <DarkAppBar  />
          <Container fixed>
            <Grid container spacing={1}>
              {data.map(function(book) {
                return (
                  <Grid item key={book.name} md={4} xs={12}>
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
