import React from "react";
import "./App.css";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Signin from "./auth/Signin";
import MyMovies from "./components/MyMovies";
import MoviePage from "./components/MoviePage";
import _ from "lodash";

export class App extends React.Component {
  state = {
    user: "",
    movies: [],
    recommendations: [],
    searchMovie: [],
    search: false,
    loggedIn: false
  };

  getLikedMovies = token => {
    fetch(`http://localhost:3000/api/v1/profile`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
      .then(response => response.json())
      .then(
        user => (
          console.log("GET LIKED MOVIE USER",user),
          this.setState({
            movies: user.user.movies
          }),
          this.getRecommendations()
        )
      );
    
  };

  // createMovieRoutes = () =>
  //   this.state.movies.map(movie => (
  //     <Route
  //       exact
  //       path={`/my_movies/:imdbId`}
  //       render={props => (
  //         <MoviePage
  //           key={movie.imdbID}
  //           movie={movie}
  //           likeMovie={this.likeMovie}
  //           dislikeMovie={this.dislikeMovie}
  //           {...props}
  //         />
  //       )}
  //     />
  //   ));

  componentDidMount = () => {
    // this.getLikedMovies();
    // this.setRecommendations()
  };

  // makeMovie = movie => {
  //   fetch(`http://localhost:3000/movies`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "Application/json",
  //       Accept: "Application/json"
  //     },
  //     body: JSON.stringify({
  //       movie: movie
  //     })
  //   });
  // };

  getRecommendations = () => {
    
    
    if(this.state.movies){this.state.movies.map(
      movie => (
        
        fetch(`http://localhost:3000/get_similar_movies`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id: movie.id
          })
        })
          .then(data => data.json())
          .then(movies => this.setRecommendations(movies))
      )
    );
      }
  };

  

  likeMovie = movie => {
    
   
    
    fetch(`http://localhost:3000/usermovies`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`

      },
      body: JSON.stringify({
        usermovie: {
          user_id: this.state.user.id,
          movie_id: movie.id,
          liked: true
        }
      })
    })
      .then(() => this.getLikedMovies())
      

    // this.getLikedMovies()
  };

  dislikeMovie = movie => {
    fetch(`http://localhost:3000/dislike_movie`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        movie_id: movie.id
      })
    }).then(() => this.getLikedMovies());
  };

  setRecommendations = movies => {
    movies.forEach(element => {
      const recs = this.sanitizeRecArray([...this.state.recommendations]);
      this.setState({
        recommendations: [...recs, element]
      });
     
    });

   
  };

  sanitizeRecArray = array => {
    return _.uniqBy(array, "imdbID");
  };

  // createRecRoutes = () =>
  //   this.state.recommendations.map(movie => (
  //     <Route
  //       exact
  //       path={`/recommendations/${movie.imdbID}`}
  //       render={props => (
  //         <MoviePage
  //           movie={movie}
  //           likeMovie={this.likeMovie}
  //           dislikeMovie={this.dislikeMovie}
  //           {...props}
  //         />
  //       )}
  //     />
  //   ));

  createSearchRoute = imdbID => {
    
    fetch(`http://www.omdbapi.com/?apikey=b345e258&i=${imdbID}`)
      .then(data => data.json())
      .then(movie => {
        
        this.setState({ searchMovie: movie, search: true });
      });
    
  };

  createUser = (username, password) => {
    fetch('http://localhost:3000/api/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    user: {

      username: username,
      password: password,
      
    }
  })
})
  .then(r => r.json())
  .then(r => {
    this.setState({ user: r.user });
    localStorage.setItem('token', r.jwt);
    if(this.state.user){
      this.setState({
        loggedIn: true,
        user: r.user,
        movies: r.user.movies
      })
      console.log('CURRENT STATE', this.state)
      this.getRecommendations()
    }
  })
  
  }

  createRoute = () => {
    
    const movie = this.state.searchMovie;
    this.setState({ searchMovie: [], search: false });

    
    return <Redirect to={`/search/${movie.imdbID}`}/>
    // return (
    //   <Route
    //     path={`/search/${movie.imdbID}`}
    //     render={props => (
    //       <MoviePage
    //         movie={movie }
    //         likeMovie={this.likeMovie}
    //         dislikeMovie={this.dislikeMovie}
    //         {...props}
    //       />
    //     )}
    //   />
    // );
  };

  fetchToken = (username, password) => {
    console.log('Hitting fetch token', username, password)
    fetch('http://localhost:3000/api/v1/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    
      user : {
        username: username,
        password: password
      }
      
    
  })
}).then(r => r.json())
.then(r => {
  this.setState({ user: r.user });
  localStorage.setItem('token', r.jwt);
  if(this.state.user){
    this.setState({
      loggedIn: true,
      user: r.user,
      movies: r.user.movies
    })
    console.log('CURRENT STATE', this.state)
    this.getRecommendations()
  }


})
console.log("This is inside the local storage", localStorage)
  }

  checkLoggedIn = () => {

    if(this.state.loggedIn){
      return <Redirect to={'/'} />
    }
    else{
      return <Redirect to={'/signin'} />
    }
    
  }

  

  

  render() {
    return (
      
      <div>
        
        <Router>
          {this.checkLoggedIn()}
          {console.log("movies from state: ", this.state.movies)}

          <Route exact path="/signin" render={props => (
              <Signin
                fetchToken={this.fetchToken}
                createUser={this.createUser}
                {...props}
              />
            )}
          /> 
          <Route
            exact
            path="/"
            render={props => (
              <Home
                createSearchRoute={this.createSearchRoute}
                likedMovies={this.state.movies}
                recMovies={this.state.recommendations}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/my_movies/"
            render={props => (
              <MyMovies
                createSearchRoute={this.createSearchRoute}
                likedMovies={this.state.movies}
                likeMovie={this.likeMovie}
                dislikeMovie={this.dislikeMovie}
                {...props}
              />
            )}
          />
          {/* {this.createMovieRoutes()} */}
          {/* {this.createRecRoutes()} */}
          {this.state.search ? this.createRoute() : ""}
          <Route
            path="/search/:imdbId"
            render={props => (
              <MoviePage
                {...props}
                likeMovie={this.likeMovie}
                dislikeMovie={this.dislikeMovie}
              />
            )}
          />
          <Route
        
        path={`/my_movies/:imdbId`}
        render={props => (
          <MoviePage
            
            likeMovie={this.likeMovie}
            dislikeMovie={this.dislikeMovie}
            {...props}
          />)}/>
          <Route
        exact
        path={`/recommendations/:imdbId`}
        render={props => (
          <MoviePage
            likeMovie={this.likeMovie}
            dislikeMovie={this.dislikeMovie}
            {...props}
          />
        )}
      />


        </Router>
        
      </div>
    );
  }
}

export default App;
