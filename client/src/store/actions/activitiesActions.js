import axios from "axios";

export function fetchingActivities() {
  return { type: "FETCH_ACTIVITIES_DATA" };
}

export function fetchActivitiesSuccess(activities) {
  return {
    type: "FETCH_ACTIVITIES_SUCCESS",
    activities
  };
}

export function fetchActivitiesFailure(error) {
  return {
    type: "FETCH_ACTIVITIES_FAILURE",
    error
  };
}

export function fetchActivities(cityId) {
  return dispatch => {
    dispatch(fetchingActivities());
    axios
      .get(`/activities/${cityId}`)
      .then(res => {
        dispatch(fetchActivitiesSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchActivitiesFailure(err.response.data));
      });
  };
}
