import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttons: {
        margin: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontStyle: "italic",
        fontFamily: "Permanent Marker, sans-serif"
    },
}));

const confirmLogout = () => window.confirm("Are you sure you want to logout?");

const Nav = ({ logged_in, history }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className="nav-bar">
                <Toolbar>
                    <Typography variant="h3" className={classes.title} onClick={() => history.push("/")}>
                        <span style={{cursor: "pointer"}}>bon Voyage!</span>
                    </Typography>
                    {
                        !logged_in && (
                            <>
                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => history.push("/login")}>Login</Button>
                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => history.push("/signup")}>Create an Account</Button>
                            </>
                        )
                    }
                    {
                        logged_in && (
                            <>
                                <Typography variant="subtitle2">
                                    Logged in as: {localStorage.getItem("username")}
                                </Typography>
                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => history.push("/browse")}>Browse Destinations</Button>
                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => history.push("/my-trips")}>My Trips</Button>
                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => confirmLogout() && history.push("/logout")}>Logout</Button>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(Nav);