import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
            <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="h4">
                                {name}
                            </Typography>
                            <Typography variant="subtitle1">
                                {location}, {country}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DestinationCard;