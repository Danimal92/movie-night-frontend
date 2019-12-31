import React, { Component } from 'react'

export class Signin extends Component {

    state = {

        username: '',
        password: '',
        newUsername: '',
        newPassword: ''


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
        e.preventDefault();
        console.log('hitting login helper')
        this.props.fetchToken(this.state.username,this.state.password)
        


    }

    registrationHelper = (e) => {
        e.preventDefault();
        console.log('hitting registration helper')
        this.props.createUser(this.state.newUsername, this.state.newPassword)
    }

    



    render() {
        return (
            <div>
                <h2>Login</h2>
                <form>
                    
                    <input type="text" title="username" placeholder="username" onChange={this.setUsername} />
                    <input type="password" title="username" placeholder="password" onChange={this.setPassword} />
                    <button type="submit" className="btn" onClick={this.loginHelper}>Login</button>
                
                </form>
                <br/>
                <h2>Register</h2>
                <form>
                    
                    <input type="text" title="newUsername" placeholder="username" onChange={this.setNewUsername} />
                    <input type="password" title="newUsername" placeholder="password" onChange={this.setNewPassword} />
                    <button type="submit" className="btn" onClick={this.registrationHelper} >Login</button>
                
                </form>

                
            </div>
        )
    }
}

export default Signin
