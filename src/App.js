import React from 'react';
import './App.css';
import Home from './components/Home'
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import Signin from './auth/Signin'
import MyMovies from './components/MyMovies'
import MoviePage from './components/MoviePage'


export class App extends React.Component {


  state = {
    user: '',
    movies: []
  }

  getLikedMovies = (num) => {
    fetch(`http://localhost:3000/users/${1}`)
    .then(response => response.json())
    .then(user => (
      
      this.setState({
          movies: user.movies
      })
      ))
}

createMovieRoutes = () => (
      this.state.movies.map((movie) => (
      <Route  exact path={`/my_movies/${movie.imdbID}`} render={(props) => (<MoviePage key={movie.imdbID} movie={movie}  {...props}  />)} />
      
  ))
)

componentDidMount = () => {
  this.getLikedMovies()
}






render() {
return (
    <div>
     <Router>
       {console.log('movies from state: ',this.state.movies )}
     
     <Route exact path='/signin'  />
     <Route exact path='/' render={(props) => (<Home likedMovies={this.state.movies}  {...props}  />)} />
     <Route exact path='/my_movies' render={(props) => (<MyMovies likedMovies={this.state.movies}  {...props}  />)} />
     {this.createMovieRoutes()}
     </Router>
    

    </div>
  )};
}

export default App;
