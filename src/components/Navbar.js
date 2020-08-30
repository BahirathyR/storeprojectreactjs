import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Toolbar,IconButton,Button,Typography} from '@material-ui/core';


export default class Navbar extends Component {
    render() {
        return (
            <AppBar position="static">
            <Toolbar>
              {/* <IconButton edge="start" className="menubutton" color="inherit" aria-label="menu">
                <MenuIcon /> */}
              {/* </IconButton> */}
              <Typography variant="h4" style={{marginLeft:"510px"}} className="title">HomePage 
           </Typography>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
        );
          
    }
}
