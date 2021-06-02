import React, { useEffect } from "react";

import { withRouter } from "react-router"
import { connect } from "react-redux";
import { fetchDestinations } from "../redux/actions/fetchDestinations";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import DestinationCard from "./DestinationCard";

const useStyles = makeStyles((theme) => ({
    pagination: {
        margin: 'auto',
        width: 430,
        marginTop: "20px",
        marginBottom: "20px",
    },
    filters: {
        margin: 'auto',
        maxWidth: 750,
    },
    search: {
        margin: "auto",
        maxWidth: 700
    }
}));

const filterDestinations = (countryFilter, searchValue, destinations) => {
    let filteredDestinations = destinations.sort((a, b) => a.name.localeCompare(b.name));
    if (countryFilter !== "all" && countryFilter !== null) {
        filteredDestinations = filteredDestinations.filter(destination => countryFilter === destination.country);
    }
    if (searchValue !== "") {
        filteredDestinations = filteredDestinations.filter(destination => destination.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
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

    const [searchValue, setSearchValue] = React.useState("");

    const [page, setPage] = React.useState(1);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        setPage(1);
    }

    const maxPages = Math.ceil(filterDestinations(countryFilter, searchValue, destinations.destinations).length / 10);

    const changePage = (e, value) => {
        setPage(value);
    }

    return (
        <React.Fragment>
            <div className={classes.filters}>
                <Autocomplete
                    style={{ margin: "20px" }}
                    value={countryValue}
                    onChange={(e, newValue) => {
                        setCountryValue(newValue);
                        setCountryFilter(newValue);
                        setPage(1);
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
            <div className={classes.search}>
                <TextField
                    onChange={handleInputChange}
                    placeholder="Search"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                />
            </div>
            <div className={classes.pagination}>
                <Pagination count={maxPages} color="secondary" page={page} onChange={changePage} shape="rounded" showFirstButton showLastButton />
            </div>
            {filterDestinations(countryFilter, searchValue, destinations.destinations).slice((page * 10) - 10, (page * 10) - 1).map(d => <DestinationCard key={d.id} destination={d} />)}
            <div className={classes.pagination}>
                <Pagination count={maxPages} color="secondary" page={page} onChange={changePage} shape="rounded" showFirstButton showLastButton />
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