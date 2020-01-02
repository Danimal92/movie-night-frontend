import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link,NavLink} from 'react-router-dom'
import noImage from '/Users/flatironschool/Desktop/movie-night/movie-night-frontend/src/harold.jpg'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor:'#F7FCFF',
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export function MovieCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  const dislikeMovieHelper = () => {
    props.dislikeMovie(props.movie)
  }

  const {title, year, rated, released, runtime, genre, director, writer, actors, plot, language, country, awards, poster, imdbRating, imdbID, boxOffice} = props.movie

  return (
    <Card className={classes.card}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
    title={<Link to={`/my_movies/${imdbID}`}>{title}</Link>}
        
      />
      <CardMedia
        className={classes.media}
        image={poster === 'N/A' ? noImage : poster}
        
      />
      <CardContent>
        <Typography noWrap={true} variant="body2" color="textSecondary" component="p">
            {plot ==='N/A' ? 'This resource has not been provided with a plot ':plot}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <IconButton onClick={dislikeMovieHelper} aria-label="share">
          <ThumbDownAltOutlinedIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Info:</Typography>
          <Typography paragraph>
            Released: {released}<br/>
            Runtime: {runtime}<br/>
            Genre: {genre}<br/>
            Director: {director}<br/>
            Actors: {actors}<br/>
            Writer: {writer}<br/>

          </Typography>
          <Typography paragraph>
                {plot}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default MovieCard