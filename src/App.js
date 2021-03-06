import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Components
import NavBar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://us-central1-social-ape-tutorial-960c4.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()){
    //Expired token
    //window.location.href = '/login';
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED }); 
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <div className="App">
        <Router>
          <NavBar />
          <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
            <Route exact path="/users/:handle" component={user} />
            <Route exact path="/users/:handle/scream/:screamId" component={user} />
          </Switch>
          </div>
        </Router>
        </div>
        </Provider>
      </MuiThemeProvider>
  );
}

export default App;
