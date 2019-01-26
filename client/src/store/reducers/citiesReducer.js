const initialState = {
  payload: [],
  isLoading: false,
  error: {}
};

//the actions call this function, depending on the action type it does...
export default function citiesReducer(state = initialState, action) {
  switch (action.type) {
    //when the call is ongoing
    case "FETCH_CITIES_DATA":
      return {
        ...state,
        isLoading: true
      };
    //when the call to the API is a success
    case "FETCH_CITIES_SUCCESS":
      return {
        ...state,
        payload: action.cities,
        error: {},
        isLoading: false
      };
    //when it's been an error during the API call
    case "FETCH_CITIES_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
