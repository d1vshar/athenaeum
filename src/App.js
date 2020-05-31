import React from 'react';
import './index.css';
import RootPage from './components/RootPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css"

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: { main: '#212121' },
      secondary: { main: '#2121a1' }
    },
  });

class App extends React.Component {
  render() {
    return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <RootPage/>
      </ThemeProvider>
    );
  }
}

export default App