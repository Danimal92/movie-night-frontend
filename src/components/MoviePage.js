import React, { Component } from 'react'

export class MoviePage extends Component {
    render() {
        return (
            <div>
                {this.props.movie.title}
            </div>
        )
    }
}

export default MoviePage



