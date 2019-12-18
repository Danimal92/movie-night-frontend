import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import AppyBar from "./AppyBar";
import Typography from "@material-ui/core/Typography";
import Harold from "/Users/flatironschool/Desktop/movie-night/movie-night-frontend/src/harold.jpg";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Fab from "@material-ui/core/Fab";
import "typeface-roboto";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "float-left",
    color: theme.palette.text.secondary
  }
}));

export function MoviePage(props) {
  const classes = useStyles();

  console.log("%cPROPS TO MOVIE  PAGE", "color:green;");
  console.dir(props);
  if (props.match.params.imdbId != props.movie.imdbID) {
    //   props.onSearchMovie(props.match.params.imdbId);
  }

  console.log(props.movie);
  const {
    title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    imdbRating,
    imdbID,
    boxoffice
  } = props.movie;

  const likeMovieHelper = () => {
    props.likeMovie(props.movie);
  };
  const dislikeMovieHelper = () => {
    props.dislikeMovie(props.movie);
  };

  return (
    <div className={classes.root}>
      <AppyBar style={{}} movie={props.movie} />

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
              backgroundColor: "#f7d0f7",
              fontSize: "2em",
              textAlign: "center"
            }}
          >
            {title}
            {`(${year})`}
          </Typography>
          <Image
            src={poster === "N/A" ? Harold : poster}
            animationDuration={3000}
            aspectRatio={2 / 3}
          />
          <Paper className={classes.paper}>
            Rating: {rated} | Runtime: {runtime} | Genre: {genre} | Released:{" "}
            {released} | Language: {language}
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper
            style={{ fontSize: "22px", fontWeight: "bold" }}
            className={classes.paper}
          >
            Director: {director} | Writer(s): {writer} | Cast: {actors}
          </Paper>
          <br />
          <Paper
            style={{ color: "#000000", fontSize: "22px", fontWeight: "bolder" }}
            className={classes.paper}
          >
            Plot: {plot}
          </Paper>
          <br />
          <Paper className={classes.paper}>
            Country: {country} | Awards: {awards} | imdbRating: {imdbRating} |
            Box Office: {boxoffice}
          </Paper>
          <br />
          <IconButton onClick={likeMovieHelper}>
            <ThumbUpOutlinedIcon />
          </IconButton>
          <IconButton>
            <ThumbDownAltOutlinedIcon onClick={dislikeMovieHelper} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
export default MoviePage;


MoviePage.defaultProps = {
    onSearchMovie: id => console.log 
}
