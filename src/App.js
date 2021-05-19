import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import './App.css';
import MainContainer from "./components/MainContainer";

class App extends React.Component {

    render() {
        return(
            <Router>
                <Switch>

                    <Route exact path="/" component={MainContainer} />

                </Switch>
            </Router>
        )
    }

}

export default App;
