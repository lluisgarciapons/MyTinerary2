import axios from "axios";

export function fetchingComments() {
  return { type: "FETCH_COMMENTS_DATA" };
}

export function fetchCommentsSuccess(comments) {
  return {
    type: "FETCH_COMMENTS_SUCCESS",
    comments
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: "FETCH_COMMENTS_FAILURE",
    error
  };
}

export function postCommentSuccess(comment) {
  return {
    type: "POST_COMMENT",
    comments: comment
  };
}

export function deleteCommentSuccess(id) {
  return {
    type: "DEL_COMMENT",
    id: id
  };
}

export function changeToast(payload) {
  return {
    type: "CHANGE_TOAST",
    toast: payload
  };
}

export function fetchComments(cityId) {
  return dispatch => {
    dispatch(fetchingComments());
    axios
      .get(`/comments/${cityId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        dispatch(fetchCommentsSuccess(res.data));
        console.log(`comments section: Authorized.`);
      })
      .catch(err => {
        console.log(`comments section: ${err.response.data}`);
        dispatch(fetchCommentsFailure(err.message));
      });
  };
}

export function postComment(body) {
  return dispatch => {
    axios
      .post(
        `/comments`,
        {
          user: {
            name: body.user.name,
            photo: body.user.photo
          },
          itinerary: body.itineraryId,
          message: body.message,
          date: body.date,
          city: body.city
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        if (res.status === 201) {
          dispatch(changeToast(true));
          dispatch(postCommentSuccess(res.data));
          console.log(
            `New comment from ${res.data.user.name}: `,
            res.data.message
          );
        } else {
          throw Error;
        }
      })
      .catch(err => {
        alert("you must be log in");
      });
  };
}

export function deleteComment(id) {
  return dispatch => {
    axios
      .delete(`/comments/find/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        if (res.status === 202) {
          dispatch(deleteCommentSuccess(id));
          console.log(res.data);
        } else {
          alert("not loooooooooged in");
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data);
      });
  };
}
