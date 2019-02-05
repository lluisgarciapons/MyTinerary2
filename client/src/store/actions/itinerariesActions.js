import axios from "axios";

export function fetchingItineraries() {
  return { type: "FETCH_ITINERARIES_DATA" };
}

export function fetchItinerariesSuccess(itineraries) {
  return {
    type: "FETCH_ITINERARIES_SUCCESS",
    itineraries
  };
}

export function fetchItinerariesFailure(error) {
  return {
    type: "FETCH_ITINERARIES_FAILURE",
    error
  };
}

export function fetchItineraries(cityId) {
  return dispatch => {
    dispatch(fetchingItineraries());
    axios
      .get(`/itineraries/${cityId}`)
      .then(res => {
        console.log(
          `Itineraries for this city: (${res.data.length}) ${res.data.map(
            it => it.title
          )}`
        );
        dispatch(fetchItinerariesSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchItinerariesFailure(err.response.data));
      });
  };
}
