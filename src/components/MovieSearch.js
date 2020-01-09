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

import React from "react";
import { throttle, debounce } from "throttle-debounce";
import { Redirect } from "react-router-dom";
import {  Search } from "semantic-ui-react";

const API_URL = "http://www.omdbapi.com/?apikey=b345e258&";

export class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { q: "", results: [], imdbID: '' };
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
    this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
  }

  changeQuery = (event) => {
    console.log('HITTING CHANGE QUERY', event)
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
    fetch(`${API_URL}s=${q}&page=1&type=movie`)
      .then(data => data.json())
      .then(data => {
        if (data.Response === "True") {
          this.setState({
            results: data.Search
          });
        }
      });

    this._fetch(this.state.results);
  };

  _fetch = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({ _searches });
  };

  handleClick = (imdbID, e) => {
    e.preventDefault();

    this.props.createSearchRoute(imdbID);
  };

  handleRedirect = (e, data) => {
    // console.log('HITTING HANDLE REDIRECT', data)
    this.setState({imdbID: data.result.imdbID})
  }

  renderResults = (e) => {
    // console.log('HITTING RENDER RESULTS', e)
    return( `${e.Title} (${e.Year})` )
  
  }

  checkPath = () => {
    console.log('checkPath', this.state.imdbID.length)
    if(this.state.imdbID !== ''){
      let id = this.state.imdbID
      console.log('sup', id)
      this.setState({imdbID:''})
    return <Redirect to={`/search/${id}`} />}

  }


  render() {
    const _searches = this.state._searches || [];

    return (
      <div>
        {this.checkPath()}
        
        {/* <Input
          placeholder="Type something here"
          type="text"
          value={this.state.q}
          onChange={this.changeQuery}
        /> */}
        
        {/* {_searches.length ? (
          <button
            type="button"
            onClick={event => this.setState({ results: [] })}
          >
            Reset
          </button>
        ) : null} */}

        <Search placeholder={'Search for movies...'} resultRenderer={this.renderResults} value={this.state.q} onSearchChange={this.changeQuery} onResultSelect={this.handleRedirect} results={this.state.results} style={{ listStyleType: "none" }}/>
          
        
      </div>
    );
  }
}

export default MovieSearch;
