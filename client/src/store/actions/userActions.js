import axios from "axios";

export function loginSuccess(user) {
  return {
    type: "LOGIN_USER",
    user
  };
}

export function loginFail(error) {
  return {
    type: "LOGIN_FAIL",
    error
  };
}

export function logout() {
  return {
    type: "LOGOUT_USER"
  };
}

export function addFavorite(id) {
  return {
    type: "ADD_FAVORITE",
    itinerary: id
  };
}

export function removeFavorite(id) {
  return {
    type: "REMOVE_FAVORITE",
    itinerary: id
  };
}

export function fetchUser() {
  return dispatch => {
    axios
      .get("/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        dispatch(loginSuccess(res.data));
        let name;
        if (res.data.auth.google) {
          name = res.data.auth.google.name;
        } else {
          name = res.data.auth.local.name;
        }
        console.log(`You are logged in as ${name}`);
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        dispatch(logout());
      });
  };
}

export function postFavorite(id) {
  return dispatch => {
    axios
      .post(
        "/user/favorites",
        {
          itinerary: id
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        if (res.status === 201) {
          console.log(`Itinerary ${res.data} ADDED to your favorites.`);
          dispatch(addFavorite(res.data));
        } else if (res.status === 202) {
          console.log(`Itinerary ${res.data} REMOVED from your favorites.`);
          dispatch(removeFavorite(res.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
