import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActions, Button } from "@material-ui/core";

const classes = {
  card: {
    margin: "10px",
    display: "flex",
    height: "180px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    marginLeft: "auto"
  },
  cover: {
    marginLeft: "auto",
    maxWidth: "116px",
    objectFit: "fill"
  }
};

class BookCard extends React.Component {  
  render() {
    return (
      <Card style={classes.card}>
        <div style={classes.details}>
          <CardContent style={classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.authors.join(', ')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Details</Button>
            <Button>Google Books</Button>
          </CardActions>
        </div>
        <CardMedia
          style={classes.cover}
          image={this.props.imgUrl}
          component="img"
        />
      </Card>
    );
  }
}

export default BookCard;
