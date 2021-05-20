import React from "react";
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Signup extends React.Component {

    state = {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: ""
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: { ...this.state } })
        })
            .then(res => res.json())
            .then(tokenObj => {
                if (tokenObj.jwt) {
                    localStorage.setItem("token", tokenObj.jwt);
                    localStorage.setItem("username", tokenObj.user.username);
                    this.props.handleLogin(tokenObj.jwt);
                    this.props.history.push("/")
                }
                else {
                    alert(tokenObj.error);
                }
            });
    }

    render() {
        return (
            <div className="signup-page">
                <form onSubmit={this.handleSubmit} className="signup-container">
                    <Typography variant="h4">Create an account</Typography>
                    <div className="form-input-box">
                        <TextField type="text" name="username" className="form-input" placeholder="Username" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <TextField type="text" name="email" className="form-input" placeholder="Email" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <TextField type="text" name="first_name" className="form-input" placeholder="First Name" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <TextField type="text" name="last_name" className="form-input" placeholder="Last Name" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <TextField type="password" name="password" className="form-input" placeholder="Password" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <TextField type="password" name="password_confirmation" className="form-input" placeholder="Confirm Password" onChange={this.handleInputChange} required />
                    </div>
                    <Button className="form-input-button" type="submit" variant="contained" color="primary">Signup</Button>
                </form>
            </div>
        )
    }

}

export default withRouter(Signup);