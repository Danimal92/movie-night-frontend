// import React, { Component } from 'react'
// import Suggestions from './Suggestions'


// const API_URL = 'http://www.omdbapi.com/?apikey=b345e258&'

// export class MovieSearch extends Component {

//     state = {
//         query: '',
//         results: []
//     }

    

//     handleInputChange = () => {
//         this.setState({
//           query: this.search.value
//         })
//       }

      

//       getInfo = () => {
//         fetch(`${API_URL}s=${this.state.query}&page=1&type=movie`)
//           .then(( data ) => data.json())
//           .then(data => data.Search)
//           .then(data => this.setState({
//               results: data.Search
//             })
//           )
//       }

//       handleInputChange = () => {
//         this.setState({
//           query: this.search.value
//         }, () => {
//           if (this.state.query && this.state.query.length > 1) {
//             if (this.state.query.length % 2 === 0) {
//               this.getInfo()
//             }
//           } 
//         })
//       }


//     render() {
//         return (
//             <>
//                 <form>
                    
//                         <input
//                         placeholder="Search for movies..."
//                         ref={input => this.search = input}
//                         onChange={this.handleInputChange}
//                         variant="outlined"
//                         size='small'
//                         margin='dense'
//                         style={{
//                                 marginTop: 20,
//                                 backgroundColor: '#d9d9d9',
//                                 marginBottom: '10px',
//                                 marginRight:  '10px',
//                                 marginLeft: '10px',}}
//                         />
//                     <Suggestions results={this.state.results} />
//                 </form>
                
//             </>
//         )
//     }
// }

// export default MovieSearch

import React from 'react'
import { throttle, debounce } from "throttle-debounce";
import {Link} from 'react-router-dom'

const API_URL = 'http://www.omdbapi.com/?apikey=b345e258&'

export class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { q: "", results: []};
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
    this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
  }

  changeQuery = event => {
    this.setState({ q: event.target.value }, () => {
      const q = this.state.q;
      if (q.length < 5) {
        this.autocompleteSearchThrottled(this.state.q);
      } else {
        this.autocompleteSearchDebounced(this.state.q);
      }
    });
  };

  autocompleteSearch = q => {
    console.log('FETCH FIRING', q)
    fetch(`${API_URL}s=${q}&page=1&type=movie`)
          .then(( data ) => data.json())
          .then((data) => {
            console.log("what is response!?",data.Response)
            if(data.Response==='True'){
            console.log("What is Search?!!",data.Search)
            this.setState({
              results: data.Search
            })}}
          )
    console.log("THE RESULTS: ", this.state.results)
    this._fetch(this.state.results);
  };

  _fetch = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({ _searches });
  };

  handleClick = (imdbID,e) => {
    e.preventDefault()
    console.log("THE ID: ", imdbID)
    console.log('THE EVENT:', e)
    this.props.createSearchRoute(imdbID)


  }

  render() {
    const _searches = this.state._searches || [];
    console.log(_searches)
    return (
      <div>
        
        <input
          placeholder="Type something here"
          type="text"
          value={this.state.q}
          onChange={this.changeQuery}
        />
        <hr />
        {_searches.length ? (
          <button
            type="button"
            onClick={event => this.setState({ results: [] })}
          >
            Reset
          </button>
        ) : null}
        <ul style={{listStyleType:'none'}}>
          {this.state.results.map((s) => {
            
          return <Link to={`/search/${s.imdbID}`} onClick={(event) =>  this.handleClick(s.imdbID,event )} ><li style={{bottomMargin:'10px',color: '#000000',backgroundColor: '#ffcfcc'}}>{s.Title} ({s.Year})</li></Link>;
          })}
        </ul>
      </div>
    );
  }
}

export default MovieSearch