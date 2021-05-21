const initialState = {
    destinations: [],
    requesting: false
}

const destinationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "START_GETTING_DESTINATIONS_REQUEST":
            return {
                ...state,
                destinations: [...state.destinations],
                requesting: true
            }
        case "GET_DESTINATIONS":
            return {
                ...state,
                destinations: action.destinations,
                requesting: false
            }
        case "START_GETTING_USER_DESTINATIONS_REQUEST":
            return {
                ...state,
                destinations: [...state.destinations],
                requesting: true
            }
        case "GET_USER_DESTINATIONS":
            return {
                ...state,
                destinations: action.destinations,
                requesting: false
            }
        case "START_ADDING_DESTINATIONS_REQUEST":
            return {
                ...state,
                destinations: [...state.destinations],
                requesting: true
            }
        case "ADD_DESTINATION":
            return state
        case "START_DELETING_DESTINATIONS_REQUEST":
            return {
                ...state,
                destinations: [...state.destinations],
                requesting: true
            }
        case "DELETE_DESTINATION":
            let newState = state.destinations.filter(d => d.id !== action.destination.id)
            return {
                ...state,
                destinations: newState,
                requesting: false
            }
        default:
            return state
    }
}

export default destinationReducer;