import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export class Signin extends Component {
  state = {
    username: "",
    password: "",
    newUsername: "",
    newPassword: "",
    login: true
  };

  componentDidMount = () => {
    localStorage.clear();
  };

  setUsername = e => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  };

  setPassword = e => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  };

  setNewUsername = e => {
    e.preventDefault();
    this.setState({ newUsername: e.target.value });
  };

  setNewPassword = e => {
    e.preventDefault();
    this.setState({ newPassword: e.target.value });
  };

  loginHelper = e => {
    e.preventDefault();

    this.props.fetchToken(this.state.username, this.state.password);
  };

  registrationHelper = e => {
    e.preventDefault();

    this.props.createUser(this.state.newUsername, this.state.newPassword);
  };

  handleLoginHelper = e => {
    this.setState({ login: false });
  };

  handleRegistrationHelper = e => {
    this.setState({ login: true });
  };

  render() {
    return (
      <div>
        {this.state.login ? (
          <Grid
            textAlign="center"
            style={{ height: "50vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h1" color="blue" textAlign="center">
                <Message> Movie Night</Message>
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    onChange={this.setUsername}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={this.setPassword}
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    onClick={this.loginHelper}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Button color="blue" onClick={this.handleLoginHelper}>
                New to us? Click here!
              </Button>
            </Grid.Column>
          </Grid>
        ) : (
          <div>

            <Grid
              textAlign="center"
              style={{ height: "50vh" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" color="blue" textAlign="center">
                  <Message> Register here!</Message>
                </Header>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                      onChange={this.setNewUsername}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      onChange={this.setNewPassword}
                    />

                    <Button
                      color="blue"
                      fluid
                      size="large"
                      onClick={this.registrationHelper}
                    >
                      Sign Up
                    </Button>
                  </Segment>
                </Form>
                <Button color="blue" onClick={this.handleRegistrationHelper}>
                  Back to Login
                </Button>
              </Grid.Column>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Signin;
