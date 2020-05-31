import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Grid from "@material-ui/core/Grid";
import {
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider
} from "@material-ui/core";
const axios = require("axios").default;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class NewVoteModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      loaded: false,
      book: {},
      isbn: 0
    };
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState(
      {
        open: false,
        loaded: false,
        isbn: 0,
        book: {}
      });
  };

  searchBook = evt => {
    axios.get("/api/voting/search/" + this.state.isbn).then(resp => {
      if (resp.data.totalItems === 1) {
        console.log(resp.data);
        let result = resp.data.items[0];

        this.setState(
          {
            book: result,
            loaded: true
          }
        )
      }
    });
  };

  render() {
    const {open, loaded, book, isbn} = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          startIcon={<AddBoxIcon></AddBoxIcon>}
          onClick={this.handleClickOpen}
        >
          Start Vote
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          maxWidth="md"
        >
          <DialogTitle onClose={this.handleClose}>
            <Typography>Add book for voting...</Typography>
            <IconButton
              aria-label="close"
              className="closeButton"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
          <form className="form" noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item md={8}>
                <TextField
                  className="field"
                  id="outlined-basic"
                  value={isbn}
                  onChange={evt => this.setState({isbn: evt.target.value})}
                  label="ISBN"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <Button
                  className="field"
                  variant="outlined"
                  onClick={this.searchBook}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          {loaded && (
            <>
              <Divider></Divider>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{book.volumeInfo.title}</TableCell>
                      <TableCell align="center" rowSpan={6}>
                        <img src={book.volumeInfo.imageLinks.thumbnail}></img>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Author</TableCell>
                      <TableCell>{book.volumeInfo.authors.join(", ")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Publisher</TableCell>
                      <TableCell>{book.volumeInfo.publisher}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Edition</TableCell>
                      <TableCell>{book.volumeInfo.edition}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>{book.volumeInfo.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ISBN</TableCell>
                      <TableCell>
                        {book.volumeInfo.industryIdentifiers[0].identifier +
                          ", " +
                          book.volumeInfo.industryIdentifiers[1].identifier}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography className="modalDescription" variant="h5">
                  Description
                </Typography>
                <Typography variant="subtitle2">
                  {book.volumeInfo.description}
                </Typography>
            </>
          )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default NewVoteModal;