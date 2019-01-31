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
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        dispatch(logout());
      });
  };
}
