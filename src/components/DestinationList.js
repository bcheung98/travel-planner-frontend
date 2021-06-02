import React, { useEffect } from "react";

import { withRouter } from "react-router"
import { connect } from "react-redux";
import { fetchDestinations } from "../redux/actions/fetchDestinations";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import DestinationCard from "./DestinationCard";

const useStyles = makeStyles((theme) => ({
    pagination: {
        margin: 'auto',
        maxWidth: 550,
        marginTop: "20px",
        marginBottom: "20px",
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        margin: 'auto',
        maxWidth: 750,
    },
}));

const filterDestinations = (countryFilter, destinations, page) => {
    let filteredDestinations = destinations.sort((a, b) => a.name.localeCompare(b.name));
    if (countryFilter !== "all" && countryFilter !== null) {
        filteredDestinations = destinations.filter(destination => countryFilter === destination.country);
    }
    filteredDestinations = filteredDestinations.slice((page * 10) - 10, (page * 10) - 1);
    return filteredDestinations;
}

const DestinationList = (props) => {

    useEffect(() => {
        fetchDestinations();
    }, [])
    let { destinations, fetchDestinations } = props;

    const classes = useStyles();

    const countries = [...new Set(destinations.destinations.map((destination) => destination.country).sort((a, b) => a.localeCompare(b)))];

    const [countryValue, setCountryValue] = React.useState("");
    const [countryInputValue, setCountryInputValue] = React.useState("");
    const [countryFilter, setCountryFilter] = React.useState("all");
    const [page, setPage] = React.useState(1);

    const maxPages = Math.ceil(destinations.destinations.length / 10);

    const changePage = (e, value) => {
        setPage(value);
    }

    return (
        <React.Fragment>
            <div className={classes.paper}>
                <Autocomplete
                    style={{ margin: "20px" }}
                    value={countryValue}
                    onChange={(e, newValue) => {
                        setCountryValue(newValue);
                        setCountryFilter(newValue);
                    }}
                    inputValue={countryInputValue}
                    onInputChange={(e, newInputValue) => {
                        setCountryInputValue(newInputValue);
                    }}
                    options={countries}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label={"Country"} variant="outlined" />}
                />
            </div>
            <div className={classes.pagination}>
                <Pagination count={maxPages} color="primary" page={page} onChange={changePage} />
            </div>
            {filterDestinations(countryFilter, destinations.destinations, page).map(d => <DestinationCard key={d.id} destination={d} />)}
            <div className={classes.pagination}>
                <Pagination count={maxPages} color="primary" page={page} onChange={changePage} />
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        destinations: state.destination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDestinations: () => dispatch(fetchDestinations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DestinationList));