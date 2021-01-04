import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Drawer, Button, Paper, Grid, Divider}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import MenuList from '../src/Views/App/MenuList';

/************ ICON****************/
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'block',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function UselessComponent() {
    const location = useLocation();

    const getLocation = () => {
        console.log(location)
    }
    return (<>acceuil <Button onClick = { getLocation } > location</Button ></>)
}


function App() {
    const classes = useStyles();
    const [darkMode, setDarkMode] = React.useState(false);
    const [drawerMenu, setDrawerMenu] = React.useState({
        left: false,
    });
    const toggleDrawerMenu = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerMenu({ ...drawerMenu, [anchor]: open });
    };
    const [categorieState, setCategorieState] = React.useState(false);
    const darkTheme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
        },
    });

    return (   
        <div className={classes.root}>
            <MuiThemeProvider theme={darkTheme}>
                <Router>
            <Grid container style={{ width: "100vw", height:'100vh' }}>
                        <Grid item xs={12} style={{ width: "100vw", height: '9vh' }}>
                        
                            <AppBar position="static" color="inherit">
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        aria-label="open drawer"
                                        onClick={toggleDrawerMenu("left", true)}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography className={classes.title} variant="h6" noWrap color="textPrimary">
                                        ReactShowcase
                              </Typography>
                                    <div>
                                        <Tooltip title={darkMode ? "Toggle to LightMode" : "Toggle to DarkMode"}>
                                            <IconButton
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => { setDarkMode(darkMode ? false : true) }}

                                            >
                                                {darkMode ? < Brightness7Icon /> : <NightsStayIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </Toolbar>
                            </AppBar>
                           
                        
                
                </Grid>
                        <Grid item xs={12} style={{ width: "100vw", height: '91vh', padding:'10px'}}>
                            <Switch>
                                <Route exact path="/">
                                    <Paper style={{ width: '100%', height: '100%' }} elevation={24}>
                                        <Typography variant="h3" align="center">HOME</Typography>
                                        <Divider />
                                        <Typography variant="body1" align={"justify"} style={{ padding: "15px" }}> Hello everybody, here you can see and use some homemade components . Hope you will like it, do not hesitate to give feedback, it will permit me to improve my skills and my way of thinking. Thank you in advance. </Typography>
                                    </Paper>
                                </Route>
                                <Route path="/ABOUT">
                                    <Paper style={{ width: '100%', height: '100%' }}  elevation={24}>
                                        <Typography variant="h3" align="center">ABOUT ME</Typography>
                                        <Divider />
                                        <Typography variant="body1" align={"justify"} style={{ padding: "15px" }}> I am newly graduated from an engeenering school, i want to improve my skills in web domain, so i share some components to get some feedback and maybe help some people. If you are interested you can train with me by contributing to this project.</Typography>
                                    </Paper>
                                </Route>
                                <Route path="/autreCategorie/fils">
                                    <div>
                                        <UselessComponent />

                                    </div>
                                </Route>
                                <Route path="/autreCategorie">
                                    <div>
                                        Please choose a component by clicking on the menu not a category
                                        acceuil
                                        
                            </div>
                                </Route>
                            </Switch>
                </Grid>
                </Grid>
                            <Drawer anchor={"left"} open={drawerMenu["left"]} onClose={toggleDrawerMenu("left", false)}>
                                {<MenuList anchor="left" categorieState={categorieState} funcCategorieState={() => { setCategorieState(!categorieState) }} />}
                            </Drawer>
               </Router>
            </MuiThemeProvider>
      </div>
  );
}

export default App;
