import React, { Component } from 'react'
import Link from 'react-router-dom/Link';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    <Button component={Link} to="/login" color="inherit">Login</Button>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/signup" color="inherit">Signup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
