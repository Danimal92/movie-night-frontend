import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import MovieSearch from "./MovieSearch";

export class NavigationBar extends Component {

    state = {
        path: ''
    }
  handleHomeClick = e => {
    //   console.log('HOME CLICK FIRING'),
    this.setState({path: 'home'})
  };

  handleMoviesClick = (e) => {
    this.setState({path: 'movies'})
  };

  handleLogoutClick = e => (
    this.props.logout()
  )

  checkPath = () => {
      console.log('hitting checkpath')
      if(this.state.path === 'home'){
          this.setState({path: ''})
          return <Redirect to={'/'} />
      }
      else if(this.state.path === 'movies' ){
        this.setState({path: ''})
        return <Redirect to={'/my_movies/'} />

      }


  }

  render() {
    return (
        
      <Menu color={"blue"} inverted secondary>
          {this.checkPath()}
        <Menu.Item name="home" onClick={this.handleHomeClick} />
        <Menu.Item name="movies" onClick={this.handleMoviesClick} />
        <Menu.Menu position="center">

        <Menu.Item>
            <MovieSearch />
            <Menu.Item color='blue' name={`Welcome, ${this.props.user.username}!`}  />
        </Menu.Item>

        </Menu.Menu>
        <Menu.Menu position="right">
          
          <Menu.Item  name="logout" onClick={this.handleLogoutClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavigationBar;
