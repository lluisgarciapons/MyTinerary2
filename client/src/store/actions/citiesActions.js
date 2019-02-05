import axios from "axios";

export function fetchingCities() {
  return { type: "FETCH_CITIES_DATA" };
}

export function fetchCitiesSuccess(cities) {
  return {
    type: "FETCH_CITIES_SUCCESS",
    cities
  };
}

export function fetchCitiesFailure(error) {
  return {
    type: "FETCH_CITIES_FAILURE",
    error
  };
}

export function fetchCities() {
  return dispatch => {
    dispatch(fetchingCities());
    axios
      .get("/cities")
      .then(res => {
        dispatch(fetchCitiesSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchCitiesFailure(err.response.statusText));
      });
  };
}
