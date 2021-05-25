import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
import { addDestination } from "../redux/actions/addDestination";
import { deleteDestination } from "../redux/actions/deleteDestination";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 750,
        margin: "auto",
        marginBottom: 20,
    },
    heading: {
        fontWeight: "bold",
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const DestinationCard = (props) => {
    const classes = useStyles();
    let { name, location, country } = props.destination
    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{name}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>{location}, {country}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div className={classes.column} />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    {
                        window.location.pathname === "/browse" ?
                            <Button onClick={() => props.add_destination(props.destination)} size="small" color="primary">Add Destination</Button>
                            :
                            <Button onClick={() => props.delete_destination(props.destination)} size="small" color="secondary">Remove Destination</Button>
                    }
                </AccordionActions>
            </Accordion>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_destination: (destination) => dispatch(addDestination(destination)),
        delete_destination: (destination) => dispatch(deleteDestination(destination))
    }
}

export default connect(null, mapDispatchToProps)(DestinationCard);