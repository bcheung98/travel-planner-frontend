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
            console.log(action.destinations)
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
        default:
            return state
    }
}

export default destinationReducer;