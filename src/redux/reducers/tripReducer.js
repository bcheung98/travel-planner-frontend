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
            console.log(action.trip.trip)
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
        default:
            return state
    }
}

export default tripReducer;