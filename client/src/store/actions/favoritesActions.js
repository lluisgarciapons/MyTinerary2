import axios from "axios";

export function fetchingFavorites() {
  return { type: "FETCH_FAVORITES_DATA" };
}

export function fetchFavoritesSuccess(favorites) {
  return {
    type: "FETCH_FAVORITES_SUCCESS",
    favorites
  };
}

export function fetchFavoritesFailure(error) {
  return {
    type: "FETCH_FAVORITES_FAILURE",
    error
  };
}

export function fetchFavorites() {
  return dispatch => {
    dispatch(fetchingFavorites());
    axios
      .get(`/itineraries/find/favorites/user`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(
          `Favorites itineraries: (${res.data.length}) ${res.data.map(
            it => it.title
          )}`
        );
        dispatch(fetchFavoritesSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(fetchFavoritesFailure(err.response.data));
      });
  };
}
