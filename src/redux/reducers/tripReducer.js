const initialState = {
    trips: {},
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
            let name = action.trip.trip.name;
            return {
                ...state,
                trips: {
                    ...state.trips,
                    [name]: action.trip
                },
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
                trips: action.trips,
                requesting: false
            }
        default:
            return state
    }
}

export default tripReducer;