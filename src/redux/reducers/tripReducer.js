const initialState = {
    trips: [],
    requesting: false
}

const tripReducer = (state = initialState, action) => {
    switch (action.type) {
        case "START_CREATE_NEW_TRIP_REQUEST":
            return {
                ...state,
                requesting: true
            }
        case "CREATE_NEW_TRIP":
            return {
                ...state,
                trips: [...state.trips, action.trip.trip],
                requesting: false
            }
        case "START_GETTING_TRIPS_REQUEST":
            return {
                ...state,
                requesting: true
            }
        case "GET_TRIPS":
            return {
                ...state,
                trips: action.trips.trips,
                requesting: false
            }
        case "START_DELETING_DESTINATIONS_REQUEST":
            return {
                ...state,
                requesting: true
            }
        case "DELETE_DESTINATION":
            let prevStateTrips = [...state.trips]
            let index = prevStateTrips.findIndex(trip => trip.id === action.trip.tripId);
            let newDestinations = prevStateTrips.filter(trip => trip.id === action.trip.tripId)[0].destinations.filter(destination => destination.id !== action.destination.id);
            prevStateTrips[index].destinations = newDestinations;
            return {
                ...state,
                requesting: false
            }
        case "START_DELETING_TRIP_REQUEST":
            return {
                ...state,
                requesting: true
            }
        case "DELETE_TRIP":
            let newTrips = state.trips.filter(trip => trip.id !== action.tripId);
            return {
                ...state,
                trips: newTrips,
                requesting: false
            }
        case "START_RENAME_TRIP_REQUEST":
            return {
                ...state,
                requesting: true
            }
        case "RENAME_TRIP":
            state.trips[state.trips.findIndex(trip => trip.id === action.tripId)].name = action.name.name;
            return {
                ...state,
                requesting: false
            }
        default:
            return state
    }
}

export default tripReducer;