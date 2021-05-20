const initialState = {
    destinations: []
}

const destinationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DESTINATIONS":
            return {
                ...state,
                destinations: action.payload
            }
        default:
            return state
    }
}

export default destinationReducer;