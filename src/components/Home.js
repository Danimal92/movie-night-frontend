import React, { Component } from 'react'
import {Link,NavLink, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import RecRow from './RecRow'
import MyMovies from './MyMovies'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import 'typeface-roboto'
import MovieSearch from './MovieSearch'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1  
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 0,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      
      marginLeft: 400,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 260,
        },
      },
    },
  }));

  



export function Home(props) {
    
    const classes = useStyles()       
        return (
            <div>
                
                <AppBar className={classes.root} position="static">
                        <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <NavLink activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}  exact to={'/'} >Home</NavLink>
                        </IconButton>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <NavLink  exact to={'/my_movies'} >My Movies</NavLink>
                        </IconButton>
          
          
          <MovieSearch createSearchRoute={props.createSearchRoute} />
        </Toolbar>
      </AppBar><br/>
                <RecRow likedMovies={props.likedMovies} recMovies = {props.recMovies} />
                
                
                {/* Friend's List  */}
            </div>
        )
    
}

export default Home
