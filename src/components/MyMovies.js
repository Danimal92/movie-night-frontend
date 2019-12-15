import React, { Component } from 'react'
import MoviePage from './MoviePage'
import {Link} from 'react-router-dom'
import MovieCard from './MovieCard'

export class MyMovies extends Component {


    createMovieLinks = () => (
        console.log('creating movie links'),
        this.props.likedMovies.map((movie) => (
        console.log('movie: ', movie ),
        <MovieCard to={`/my_movies/${movie.imdbID}`} movie={movie} />
        ))
    )


    render() {
        return (
            <div>
                {this.createMovieLinks()}
            </div>
        )
    }
}

export default MyMovies
