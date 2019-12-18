import React, { Component } from 'react'
import MoviePage from './MoviePage'
import {Link,NavLink} from 'react-router-dom'
import MovieCard from './MovieCard'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { lightBlue } from '@material-ui/core/colors';
import SearchBar from './SearchBar'
import 'typeface-roboto'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
        <Grid item xs={3}><MovieCard  to={`/my_movies/${movie.imdbID}`} likeMovie={this.props.likeMovie} dislikeMovie={this.props.dislikeMovie} movie={movie} /></Grid>
        ))
    )


    render() {
      
        return (
            
            <div>
                
                <SearchBar className={useStyles.root} /><br/>
                <Grid container spacing={2}>
                
                {this.createMovieLinks()}
                </Grid>
            </div>
           
        )
    }
}

export default MyMovies
