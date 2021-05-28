import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DestinationList from "./components/DestinationList";
import TripList from "./components/TripList";

class App extends React.Component {

    state = {
        logged_in: false,
        token: null,
    }

    handleLogin = (token) => {
        this.setState({ logged_in: true, token })
    }

    componentDidMount() {
        const authToken = localStorage.getItem('token')
        if (authToken) {
            this.setState({ logged_in: true, token: authToken })
        }
    }

    render() {
        return (
            <Router>
                <Nav logged_in={this.state.logged_in} />
                <Switch>

                    <Route exact path="/" component={Home} />

                    <Route path="/login" component={() => (
                        !this.state.logged_in ? <Login handleLogin={this.handleLogin} /> : <Redirect to="/" />
                    )} />

                    <Route path="/signup" component={() => (
                        !this.state.logged_in ? <Signup handleLogin={this.handleLogin} /> : <Redirect to="/" />
                    )} />

                    <Route path="/logout" component={() => {
                        localStorage.clear()
                        this.setState({ logged_in: false, token: null })
                        return <Redirect to="/" />
                    }} />

                    <Route path="/browse" component={() => (
                        this.state.logged_in ? <DestinationList /> : <Redirect to="/login" />
                    )} />

                    <Route path="/my-trips" component={() => (
                        this.state.logged_in ? <TripList /> : <Redirect to="/login" />
                    )} />

                </Switch>
            </Router>
        )
    }

}

export default App;
