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
    search: false
  };

  getLikedMovies = num => {
    fetch(`http://localhost:3000/users/${1}`)
      .then(response => response.json())
      .then(
        user => (
          this.setState({
            movies: user.movies
          }),
          this.getRecommendations()
        )
      );
    console.log("Ran get movies");
  };

  createMovieRoutes = () =>
    this.state.movies.map(movie => (
      <Route
        exact
        path={`/my_movies/${movie.imdbID}`}
        render={props => (
          <MoviePage
            key={movie.imdbID}
            movie={movie}
            likeMovie={this.likeMovie}
            dislikeMovie={this.dislikeMovie}
            {...props}
          />
        )}
      />
    ));

  componentDidMount = () => {
    this.getLikedMovies();
    // this.setRecommendations()
  };

  makeMovie = movie => {
    fetch(`http://localhost:3000/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json"
      },
      body: JSON.stringify({
        movie: movie
      })
    });
  };

  getRecommendations = () => {
    console.log("running getRecommendations");
    console.log("likedmovies prop", this.state.movies);
    this.state.movies.map(
      movie => (
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
        })
          .then(data => data.json())
          .then(movies => this.setRecommendations(movies))
      )
    );
  };

  likeMovie = movie => {
    fetch(`http://localhost:3000/usermovies`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json"
      },
      body: JSON.stringify({
        usermovie: {
          user_id: 1,
          movie_id: movie.id,
          liked: true
        }
      })
    })
      .then(() => this.getLikedMovies())
      .then(() => this.makeMovie(movie));

    // this.getLikedMovies()
  };

  dislikeMovie = movie => {
    fetch(`http://localhost:3000/dislike_movie`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json"
      },
      body: JSON.stringify({
        user_id: 1,
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
      console.log("set recs", this.state.recommendations);
    });

    console.log("recommendations: ", this.state.recommendations);
  };

  sanitizeRecArray = array => {
    return _.uniqBy(array, "imdbID");
  };

  createRecRoutes = () =>
    this.state.recommendations.map(movie => (
      <Route
        exact
        path={`/recommendations/${movie.imdbID}`}
        render={props => (
          <MoviePage
            movie={movie}
            likeMovie={this.likeMovie}
            dislikeMovie={this.dislikeMovie}
            {...props}
          />
        )}
      />
    ));

  createSearchRoute = imdbID => {
    console.log("hitting fetch");
    fetch(`http://www.omdbapi.com/?apikey=b345e258&i=${imdbID}`)
      .then(data => data.json())
      .then(movie => {
        console.log("THIS IS THE FETCHED MOVIE", movie);
        this.setState({ searchMovie: movie, search: true });
      });
    console.log("state of search movie: ", this.state.searchMovie);
  };

  createRoute = () => {
    console.log("hitting create route");
    const movie = this.state.searchMovie;
    this.setState({ searchMovie: [], search: false });

    console.log(
      "showing state of searched movie again",
      this.state.searchMovie.length
    );
    this.redirectFunc(movie);
    return (
      <Route
        path={`/search/${movie.imdbID}`}
        render={props => (
          <MoviePage
            movie={movie}
            likeMovie={this.likeMovie}
            dislikeMovie={this.dislikeMovie}
            {...props}
          />
        )}
      />
    );
  };

  redirectFunc = movie => {
    setTimeout(() => {
      console.log("redirecting to :", movie);
      return <Redirect to={`/search/${movie.imdbID}`} />;
    }, 2000);
  };

  render() {
    return (
      <div>
        <Router>
          {console.log("movies from state: ", this.state.movies)}

          <Route exact path="/signin" />
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
            path="/my_movies"
            render={props => (
              <MyMovies
                likedMovies={this.state.movies}
                likeMovie={this.likeMovie}
                dislikeMovie={this.dislikeMovie}
                {...props}
              />
            )}
          />
          {this.createMovieRoutes()}
          {this.createRecRoutes()}
          {this.state.search ? this.createRoute() : ""}
          <Route
            path="/search/:imdbId"
            render={props => (
              <MoviePage
                {...props}
                onSearchMovie={this.createSearchRoute}
                movie={this.state.searchMovie}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
