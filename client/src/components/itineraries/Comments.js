import React, { Component } from "react";
import {
  postComment,
  deleteComment
} from "../../store/actions/commentsActions";
import { connect } from "react-redux";

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      inputValue: ""
    };
  }

  //finds the comments for each itinerary
  findComments = (itinerary, comments) => {
    return comments.filter(comment => comment.itinerary._id === itinerary._id);
  };

  onClickHandler() {
    if (this.state.inputValue !== "") {
      let itinerary = this.props.itinerary;
      let commentBody = {
        user: {
          name: this.props.user.name,
          photo: this.props.user.image
        },
        itineraryId: itinerary._id,
        message: this.state.inputValue,
        date: Date.now(),
        city: itinerary.city._id
      };
      this.props.postComment(commentBody);
      this.setState({
        inputValue: ""
      });
      //I have to do this because the component won't re-render itself when I post a comment
      window.location.reload();
    }
  }

  updateInputValue() {
    this.setState({
      inputValue: this.textInput.current.value
    });
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  deletePost(e) {
    e.persist();
    let confirmDelete = window.confirm(
      "are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      this.props.deleteComment(e.target.id);
    }
  }

  render() {
    // let comments = this.props.comments.payload;
    const comments = this.findComments(
      this.props.itinerary,
      this.props.comments.payload
    );
    const username = this.props.user.name;
    return (
      <>
        {this.props.user.isLoggedIn ? (
          <div className="row comments-section">
            <h3>Comments</h3>
            <div className="col s8 offset-s1">
              <input
                value={this.state.inputValue}
                ref={this.textInput}
                onChange={this.updateInputValue}
                className="comment-input"
                type="text"
                placeholder="write here"
              />
            </div>
            <button onClick={this.onClickHandler} className="btn">
              <i className="material-icons">send</i>
            </button>
            {comments.map((comment, index) => {
              let date = this.formatDate(new Date(comment.date));
              return (
                <div className="col s12 comment" key={index}>
                  <img
                    className="comment-image"
                    src={comment.user.photo}
                    alt="profile"
                  />
                  <div className="comment-box">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user.name}</span>
                      {username === comment.user.name && (
                        <div
                          className="close"
                          onClick={this.deletePost.bind(this)}
                        >
                          <i id={comment._id} className="material-icons">
                            close
                          </i>
                        </div>
                      )}
                    </div>
                    <p className="comment-message">{comment.message}</p>
                    <small className="comment-time">{date}</small>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h3 className="alert comments-section">
            You must LOG IN to see the comments section.
          </h3>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  { postComment, deleteComment }
)(Comments);
