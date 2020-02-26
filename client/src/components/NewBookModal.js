import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
} from "@material-ui/core";
const axios = require("axios").default;

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    margin: theme.spacing(2)
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewBookModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [book, setBook] = React.useState({});
  const [isbn, setISBN] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchBook = (evt) => {
    axios.post("http://localhost:9000/api/voting/add/"+ isbn)
    .then( resp => {
      if(resp.data.totalItems === 1) {
        console.log(resp.data);
        setLoaded(true);
        let result = resp.data.items[0];
        setBook(result);
      }
    });
    window.location.reload();
  }

  if(loaded) {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddBoxIcon></AddBoxIcon>}
          onClick={handleClickOpen}
        >
          New Request
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Book Request
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.form} noValidate autoComplete="off" onSubmit={searchBook}>
            <TextField className={classes.field} id="outlined-basic" value={isbn} onChange={evt => setISBN(evt.target.value)}
            label="ISBN" type="number" variant="outlined" fullWidth/>
            <Button className={classes.field} type="submit" color="secondary" variant="contained" >
                Search
            </Button>
          </form>
          <Divider></Divider>
          <DialogContent dividers>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{book.volumeInfo.title}</TableCell>
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
                  <TableCell>ISBN10</TableCell>
                  <TableCell>
                    {book.volumeInfo.industryIdentifiers[0].identifier + ", " + book.volumeInfo.industryIdentifiers[1].identifier}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography style={classes.modalDescription} variant="h5">
              Description
            </Typography>
            <Typography variant="subtitle2">
              {book.volumeInfo.description}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  else {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddBoxIcon></AddBoxIcon>}
          onClick={handleClickOpen}
        >
          New Request
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Book Voting
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.form} noValidate autoComplete="off" onSubmit={searchBook}>
            <TextField className={classes.field} id="outlined-basic" value={isbn} onChange={evt => setISBN(evt.target.value)}
            label="ISBN" type="number" variant="outlined" fullWidth/>
            <Button className={classes.field} type="submit" color="secondary" variant="contained" >
                Add
            </Button>
          </form>
        </Dialog>
      </div>
    );
  }
}
