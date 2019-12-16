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
    movies: [],
    recommendations: []
  }

  getLikedMovies = (num) => {
    fetch(`http://localhost:3000/users/${1}`)
    .then(response => response.json())
    .then(user => (
      
      this.setState({
          movies: user.movies
      }), this.getRecommendations()
      ))
      

      
}

createMovieRoutes = () => (
      this.state.movies.map((movie) => (
      <Route  exact path={`/my_movies/${movie.imdbID}`} render={(props) => (<MoviePage key={movie.imdbID} movie={movie}  {...props}  />)} />
      
  ))
)

componentDidMount = () => {
  this.getLikedMovies()
  // this.setRecommendations()
}

getRecommendations = () => {
  console.log("running getRecommendations")
  console.log('likedmovies prop', this.state.movies)
  this.state.movies.map((movie) => (
      console.log("inside the mapping"),
      fetch(`http://localhost:3000/get_similar_movies`, {
  method: "POST",
  headers: {
    "Content-Type": "Application/json",
    Accept: "Application/json"
  },
  body: JSON.stringify({
    id: movie.id
  })
  }
  )
  .then(data => data.json())
  .then(movies => this.setRecommendations(movies) )
  ))
}

setRecommendations = (movies) => {
  movies.forEach(element => {
      this.setState({
          recommendations: [...this.state.recommendations, element]
      })
  });

  console.log('recommendations: ', this.state.recommendations)
}






render() {
return (
    <div >
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
