const initialState = {
  isLoggedIn: false,
  name: null,
  email: null,
  image: null,
  error: null,
  favorites: []
};

//the actions call this function, depending on the action type it does...
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      //if action.user.auth.google does not exist, take the info from local
      return {
        ...state,
        isLoggedIn: true,
        name: action.user.auth.google
          ? action.user.auth.google.name
          : action.user.auth.local.name,
        email: action.user.auth.google
          ? action.user.auth.google.email
          : action.user.auth.local.email,
        image: action.user.auth.google ? action.user.auth.google.image : null,
        error: null,
        favorites: action.user.favorites
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        error: action.error
      };
    case "LOGOUT_USER":
      return {
        ...initialState
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.itinerary]
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          itinerary => itinerary !== action.itinerary
        )
      };

    default:
      return state;
  }
}
