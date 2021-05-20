const initialState = {
    destinations: []
}

const destinationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DESTINATIONS":
            return {
                ...state,
                destinations: action.destinations
            }
        default:
            return state
    }
}

export default destinationReducer;