import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Typography from "@material-ui/core/Typography";
import Harold from "../harold.jpg";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
// import Fab from "@material-ui/core/Fab";
import "typeface-roboto";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const INITIAL_MOVIE = {
  Title: "Loading...",
  Year: "Loading...",
  Rated: "Loading...",
  Released: "Loading...",
  Runtime: "Loading...",
  Genre: "Loading...",
  Director: "Loading...",
  Writer: "Loading...",
  Actors: "Loading...",
  Plot: "Loading...",
  Language: "Loading...",
  Country: "Loading...",
  Awards: "Loading...",
  Poster: "Loading...",
  imdbRating: "Loading...",
  imdbID: "Loading...",
  BoxOffice: "Loading..."
};

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     "& > *": {
//       margin: theme.spacing(1)
//     }
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "float-left",
//     color: theme.palette.text.secondary
//   }
// }));

export function MoviePage(props) {
  // const classes = useStyles();

  const [displayMovie, updateDisplayMovie] = useState(INITIAL_MOVIE);
  const [fetchAgain, stopFetch] = useState(true);
  const [likebutton, liked] = useState(false);
  const [dislikebutton, disliked] = useState(false);

  useEffect(() => {
    console.log('loaded', fetchAgain)
    return stopFetch(!fetchAgain)
  }, [])

  useEffect(() => {
    console.log('movie changed', props.movie.Title);
}, [props.movie.Title])

  if (displayMovie.imdbID === "Loading..." || displayMovie.imdbID != props.match.params.imdbId ) {
    console.log(props.movie.imdbID, displayMovie.imdbID)
    fetch(
      `http://www.omdbapi.com/?apikey=b345e258&i=${props.match.params.imdbId}&plot=full`
    )
      .then(data => data.json())
      .then(data => {
        
        console.log(data);
        updateDisplayMovie(data);
        stopFetch(false);
      });
  }

  const makeMovie = movie => {

    return fetch(`http://localhost:3000/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        title: movie.Title,
        year: movie.Year,
        rated: movie.Rated,
        released: movie.Released,
        runtime: movie.Runtime,
        genre: movie.Genre,
        director: movie.Director,
        writer: movie.Writer,
        actors: movie.Actors,
        plot: movie.Plot,
        language: movie.Language,
        country: movie.Country,
        awards: movie.Awards,
        poster: movie.Poster,
        imdbRating: movie.imdbRating,
        imdbID: movie.imdbID,
        boxoffice: movie.BoxOffice
      })
    });
  };

  console.log("!!!!!!!", displayMovie);

  let {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    imdbRating,
    imdbID,
    BoxOffice
  } = displayMovie;

  // const findMovie = () => {

  //  fetch(`http://localhost:3000/find_by_imdbID`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "Application/json",
  //       Accept: "Application/json"
  //     },
  //     body: JSON.stringify({

  //       imdbID: displayMovie.imdbID

  //     })
  //   }).then(data => data.json())
  //   .then(movie =>  movie)
  //   // .then(movie => movie)
  // }

  let movieObject = {}
  

  const likeMovieHelper = () => {
    makeMovie(displayMovie)
    .then(() => {
      fetch(`http://localhost:3000/find_by_imdbID`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        imdbID: displayMovie.imdbID
      })
    })
      .then(data => data.json())
      .then(movie => (
        console.log('MOVIEEEWEEEEEEEEEEEEEEEEEEEE', movie),
        props.likeMovie(movie),
        movieObject = movie
      ));
      liked(true)
      disliked(false)
  })
};

  const dislikeMovieHelper = () => {
    fetch(`http://localhost:3000/find_by_imdbID`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        imdbID: displayMovie.imdbID
      })
    })
      .then(data => data.json())
      .then(movie => props.dislikeMovie(movie));
      liked(false)
      disliked(true)
  };

console.log("PROPS", props)

  return (
    <div>
      

      <Grid container spacing={0}>
        <Grid style={{ color: "#a84a32" }} item xs={12}></Grid>
      </Grid>
      <br />
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Typography
            style={{
              fontWeight: "bolder",
              fontFamily: "roboto",
              backgroundColor: "#3283CF",
              fontSize: "2em",
              textAlign: "center"
            }}
          >
            {Title}
            {`(${Year})`}
          </Typography>
          <Image
            src={Poster === "N/A" ? Harold : Poster}
            animationDuration={3000}
            aspectRatio={2 / 3}
          />
          <Paper>
            Rating: {Rated} | Runtime: {Runtime} | Genre: {Genre} | Released:{" "}
            {Released} | Language: {Language}
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper style={{ fontSize: "22px", fontWeight: "bold" }}>
            Director: {Director} | Writer(s): {Writer} | Cast: {Actors}
          </Paper>
          <br />
          <Paper
            style={{ color: "#000000", fontSize: "22px", fontWeight: "bolder" }}
          >
            Plot: {Plot}
          </Paper>
          <br />
          <Paper>
            Country: {Country} | Awards: {Awards} | imdbRating: {imdbRating} |
            Box Office: {BoxOffice}
          </Paper>
          <br />
          <IconButton onClick={likeMovieHelper}>
            {likebutton  ?  <ThumbUpIcon /> : <ThumbUpOutlinedIcon /> }
          </IconButton>
          <IconButton onClick={dislikeMovieHelper}>
          {dislikebutton  ?  <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon /> }
          </IconButton>
        </Grid>
      </Grid>
      
    </div>
  );
}
export default MoviePage;

MoviePage.defaultProps = {
  movie: {
    Title: "Loading...",
    Year: "Loading...",
    Rated: "Loading...",
    Released: "Loading...",
    Runtime: "Loading...",
    Genre: "Loading...",
    Director: "Loading...",
    Writer: "Loading...",
    Actors: "Loading...",
    Plot: "Loading...",
    Language: "Loading...",
    Country: "Loading...",
    Awards: "Loading...",
    Poster: "Loading...",
    imdbRating: "Loading...",
    imdbID: "Loading...",
    BoxOffice: "Loading..."
  },
  userMovies: []
};
