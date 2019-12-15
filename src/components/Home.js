import React, { Component } from 'react'
import {Link, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import RecRow from './RecRow'
import MyMovies from './MyMovies'

export class Home extends Component {

 
    



   

    

      
    

    render() {
        return (
            <div>
                <h1>Welcome, User!</h1>
                <RecRow likedMovies = {this.props.likedMovies} />
                <Link to={`/my_movies/`}>My Movies</Link>
                {/* Search bar */}
                {/* Friend's List  */}
            </div>
        )
    }
}

export default Home
