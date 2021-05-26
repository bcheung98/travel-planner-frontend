import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { addDestination } from "../redux/actions/addDestination";
import { deleteDestination } from "../redux/actions/deleteDestination";

const useStyles = makeStyles({
    root: {
        margin: "auto",
        marginBottom: 20,
        maxWidth: 500,
        border: "2px solid gray"
    },
    media: {
        height: 650
    },
});

const DestinationCard = (props) => {
    const classes = useStyles();
    let { name, location, country, image, description } = props.destination;
    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                }
                subheader={
                    <Typography variant="body2" component="p">{location}, {country}</Typography>
                }
            />
            <CardMedia
                className={classes.media}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" component="p">{description}</Typography>
            </CardContent>
            <CardActions>
                {
                    window.location.pathname === "/browse" ?
                        <Button onClick={() => props.add_destination(props.destination)} variant="contained" size="small" color="primary">Add Destination</Button>
                        :
                        <Button onClick={() => props.delete_destination(props.destination)} variant="contained" size="small" color="secondary">Remove Destination</Button>
                }
            </CardActions>
        </Card>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_destination: (destination) => dispatch(addDestination(destination)),
        delete_destination: (destination) => dispatch(deleteDestination(destination))
    }
}

export default connect(null, mapDispatchToProps)(DestinationCard);