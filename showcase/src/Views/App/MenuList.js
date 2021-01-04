import React from 'react';
import { Typography, List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, Breadcrumbs, Link as MuiLink, useMediaQuery} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Route, Link } from 'react-router-dom';

/***** ICON *******/
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/MoveToInbox';



function MenuList(props) {
    const matches = useMediaQuery('(max-width:650px)');
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
            width: matches ? 275: 400,
        },
        fullList: {
            width: 'auto',
        },
        toolbar: theme.mixins.toolbar,
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }));
    const classes = useStyles();
    const anchor = props.anchor;
    const categorieState = props.categorieState;

    const LinkRouter = (props) => <MuiLink {...props} component={Link} />;

    return (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        >
            <div className={classes.toolbar} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {matches ? "SHOWCASE" :
                    <Route>
                        {({ location }) => {
                            const pathnames = location.pathname.split('/').filter((x) => x);
                            return (
                                <Breadcrumbs aria-label="breadcrumb">
                                    {
                                        (location.pathname !== "/") ?
                                        <LinkRouter color="inherit" to="/">
                                                HOME
                                        </LinkRouter>                                     
                                        :
                                        <Typography color="textPrimary">
                                            HOME
                                        </Typography>
                                        
                                    }
                                    {pathnames.map((value, index) => {
                                       
                                            const last = index === pathnames.length - 1;
                                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                                            return last ? (
                                                <Typography color="textPrimary" key={to}>
                                                    {value}
                                                </Typography>
                                            ) : (
                                                    <LinkRouter color="inherit" to={to} key={to}>
                                                        {value}
                                                    </LinkRouter>
                                                );
                                       
                                    })}
                                </Breadcrumbs>
                            );
                        }}
                    </Route>
                 }
            </div >
            <Divider />
            <List>
                <ListItem button component={Link} to={'/'} >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="HOME" />
                </ListItem>
                <ListItem button component={Link} to={'/ABOUT'} >
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="ABOUT" />
                </ListItem>           
            </List>
            <Divider />
            <List>
                <ListItem button component={Link} to={'/autreCategorie'} onClick={props.funcCategorieState}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {categorieState ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={categorieState} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to={'/autreCategorie/fils'} className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );
}

export default MenuList;