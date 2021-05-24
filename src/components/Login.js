import React from "react";
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "../form.css";

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
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
                    alert(tokenObj.message);
                }
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-container">
                    <Typography variant="h3">Login</Typography>
                    <div className="form-input-box">
                        <TextField type="text" name="username" className="form-input" placeholder="Username" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <TextField type="password" name="password" className="form-input" placeholder="Password" onChange={this.handleInputChange} required />
                    </div>
                    <Button className="form-input-button" type="submit" variant="contained" color="primary">Login</Button>
                </form>
            </div>
        )
    }

}

export default withRouter(Login);