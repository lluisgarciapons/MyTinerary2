const initialState = {
  payload: [],
  isLoading: false,
  error: {}
};

//the actions call this function, depending on the action type it does...
export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    //when the call is ongoing
    case "FETCH_FAVORITES_DATA":
      return {
        ...state,
        isLoading: true
      };
    //when the call to the API is a success
    case "FETCH_FAVORITES_SUCCESS":
      return {
        ...state,
        payload: action.favorites,
        error: {},
        isLoading: false
      };
    //when it's been an error during the API call
    case "FETCH_FAVORITES_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
