import React, { Component } from 'react'
import {Link, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import RecRow from './RecRow'
import MyMovies from './MyMovies'

export class Home extends Component {
    
    state = {
        recommendations: []
    }

 
    


    componentDidMount = () => {
        
    }

   

    

      
    

    render() {
        return (
            <div>
                <h1>Welcome, User!</h1>
                <RecRow recMovies = {this.state.recommendations} />
                <Link to={`/my_movies/`}>My Movies</Link>
                {/* Search bar */}
                {/* Friend's List  */}
            </div>
        )
    }
}

export default Home
