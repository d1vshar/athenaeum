import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RootPage from './components/RootPage';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: { main: '#212121' },
      secondary: { main: '#2121a1' }
    },
  });

ReactDOM.render(
<ThemeProvider theme={darkTheme} ><CssBaseline /><RootPage/></ThemeProvider>, 
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
