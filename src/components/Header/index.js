import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

/*
    App Header Component
*/
const Header = () => {
  return (
    <AppBar color="secondary" position="static">
        <Toolbar>
        <Typography variant="h6">
            TinyList
        </Typography>
        </Toolbar>
    </AppBar>
  );
}

export default Header;
