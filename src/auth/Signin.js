import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export class Signin extends Component {

    state = {

        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        login: true



    }

    componentDidMount = () => {
        localStorage.clear()

    }

    setUsername = (e) => {
        console.log(this.state)
        e.preventDefault();
        this.setState({  username: e.target.value  })
        console.log(this.state)

    }

    setPassword = (e) => {
        console.log(this.state)
        e.preventDefault();
        this.setState({  password: e.target.value  })
        console.log(this.state)
    }

    setNewUsername = (e) => {
        console.log(this.state)
        e.preventDefault();
        this.setState({  newUsername: e.target.value  })
        console.log(this.state)

    }

    setNewPassword = (e) => {
        console.log(this.state)
        e.preventDefault();
        this.setState({  newPassword: e.target.value  })
        console.log(this.state)
    }

    loginHelper = (e) => {
        e.preventDefault()
        console.log('hitting login helper')
        this.props.fetchToken(this.state.username,this.state.password)
        


    }

    registrationHelper = (e) => {
        e.preventDefault();
        console.log('hitting registration helper')
        this.props.createUser(this.state.newUsername, this.state.newPassword)
    }

    handleLoginHelper = (e) => {

        this.setState({login:false})

    }

    handleRegistrationHelper = (e) => {

        this.setState({login:true})

    }

    



    render() {
        return (
            <div>
            {this.state.login ? 
                // <div>
                // <h2>Login</h2>
                //     <form>
                        
                //         <input type="text" title="username" placeholder="username" onChange={this.setUsername} />
                //         <input type="password" title="username" placeholder="password" onChange={this.setPassword} />
                //         <button type="submit" className="btn" onClick={this.loginHelper}>Login</button>
                    
                //     </form>
                //     <button onClick={this.handleLoginHelper}>New User?</button>
                // </div> 
                <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='blue' textAlign='center'>
                    <Message> Movie Night</Message >
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.setUsername} />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={this.setPassword}
                    />

                    <Button color='blue' fluid size='large' onClick={this.loginHelper}>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Button color='blue' onClick={this.handleLoginHelper}>
                    New to us? Click here!
                </Button>
                </Grid.Column>
            </Grid>



                
                
                :
                <div>
                {/* <h2>Register</h2>
                <form>
                    
                    <input type="text" title="newUsername" placeholder="username" onChange={this.setNewUsername} />
                    <input type="password" title="newUsername" placeholder="password" onChange={this.setNewPassword} />
                    <button type="submit" className="btn" onClick={this.registrationHelper} >Login</button>
                
                </form>
                <button onClick={this.handleRegistrationHelper}>Back to Login</button> */}

                    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' color='blue' textAlign='center'>
                            <Message> Register here!</Message >
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.setNewUsername} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.setNewPassword}
                            />

                            <Button color='blue' fluid size='large' onClick={this.registrationHelper}>
                                Sign Up
                            </Button>
                            </Segment>
                        </Form>
                        <Button color='blue' onClick={this.handleRegistrationHelper}>
                            Back to Login
                        </Button>
                        </Grid.Column>
                    </Grid>

                
                </div>}
            </div>
        )
    }
}

export default Signin



