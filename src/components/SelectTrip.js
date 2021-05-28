import React, { useEffect } from "react";

import { fetchTrips } from "../redux/actions/fetchTrips";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { connect } from "react-redux";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

const SelectTrip = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Select Trip</DialogTitle>
            <List>
                {props.trips.trips.map(trip => (
                    <ListItem button onClick={() => handleListItemClick(trip.name)} key={trip.id}>
                        <ListItemText primary={trip.name} />
                    </ListItem>
                ))}
                <ListItem autoFocus button onClick={() => handleListItemClick('newTrip')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create new trip" />
                </ListItem>
            </List>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        trips: state.trip
    }
}

export default connect(mapStateToProps)(SelectTrip);