import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { addDestination } from "../redux/actions/addDestination";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        border: "2px solid black",
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: 20,
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    buttons: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const DestinationCard = (props) => {
    const classes = useStyles();
    let { name, location, country } = props.destination
    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">
                {name}
            </Typography>
            <Typography variant="subtitle1">
                {location}, {country}
            </Typography>
            <Button onClick={() => props.add_destination(props.destination)} className={classes.buttons}>
                +
            </Button>
        </Paper>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_destination: (destination) => dispatch(addDestination(destination))
    }
}

export default connect(null, mapDispatchToProps)(DestinationCard);