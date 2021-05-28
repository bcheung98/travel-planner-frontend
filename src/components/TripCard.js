import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid rgba(0, 0, 0, .25)',
        borderRadius: "2px",
        width: 750,
        margin: "auto",
        marginBottom: 20,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
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

const TripCard = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{props.name}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}></Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <List>
                            {props.destinations.length > 0 ?
                                props.destinations.map(destination => {
                                    return (
                                        <ListItem key={destination.name}>
                                            <ListItemText
                                                primary={destination.name}
                                                secondary={`${destination.location}, ${destination.country}`}
                                            />
                                        </ListItem>
                                    )
                                })
                                :
                                <ListItem>
                                    <ListItemText
                                        primary="No destinations for this trip!"
                                    />
                                </ListItem>
                            }
                        </List>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" color="primary">
                            Edit Trip
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>
        </div>
    )
}

export default TripCard;