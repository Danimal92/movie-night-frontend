import React, { Component } from 'react'
import MoviePage from './MoviePage'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import Harold from '/Users/flatironschool/Desktop/movie-night/movie-night-frontend/src/harold.jpg'
import '@brainhubeu/react-carousel/lib/style.css';
import Image from 'material-ui-image';
import {BrowserRouter as Router,Route, Redirect,Link} from 'react-router-dom'
import popeye from '/Users/flatironschool/Desktop/movie-night/movie-night-frontend/src/popeye.jpg'

export class RecRow extends Component {

    
    
    

  componentDidMount = () => {

  }

  

  

  getPosters = () => (
      this.props.recMovies.map((movie) => {
            const check = []
            if(!this.props.likedMovies.includes(movie) && !check.includes(movie) ){
            check.push(movie)
            return <Link to={`/recommendations/${movie.imdbID}`}><img  src={movie.poster==='N/A'?popeye:movie.poster}   /></Link>}
            
        
    })
  )



    render() {
        
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Recommendations based on your activity</h1>
                 <Carousel
                infinite
                centered
                arrows
                slidesPerPage={5}
                slides={this.getPosters()}
                >
                
                </Carousel>
                
            </div>
        )
    }
}

export default RecRow


