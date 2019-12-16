import React, { Component } from 'react'
import MoviePage from './MoviePage'
import {Link} from 'react-router-dom'
import MovieCard from './MovieCard'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { lightBlue } from '@material-ui/core/colors';
import SearchBar from './SearchBar'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export class MyMovies extends Component {


    createMovieLinks = () => (
        console.log('creating movie links'),
        this.props.likedMovies.map((movie) => (
        console.log('movie: ', movie ),
        <Grid item xs={3}><MovieCard to={`/my_movies/${movie.imdbID}`} movie={movie} /></Grid>
        ))
    )


    render() {
        return (
            
            <div>
                <h1 style={{textAlign: 'center'}}>My Movies</h1>
                <SearchBar /><br/>
                <Grid container spacing={3}>
                
                {this.createMovieLinks()}
                </Grid>
            </div>
           
        )
    }
}

export default MyMovies
