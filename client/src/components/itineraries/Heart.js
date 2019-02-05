import React, { Component } from "react";
import { postFavorite } from "../../store/actions/userActions";
import { connect } from "react-redux";

export class Heart extends Component {
  loggedInHeart() {
    if (this.props.user.favorites.includes(this.props.itinerary._id)) {
      return (
        <span
          className="favorite col s2"
          onClick={() => this.clickHeart(this.props.itinerary._id, true)}
        >
          <i className="material-icons">favorite</i>
        </span>
      );
    } else {
      return (
        <span
          className="favorite col s2"
          onClick={() => this.clickHeart(this.props.itinerary._id, false)}
        >
          <i className="material-icons">favorite_border</i>
        </span>
      );
    }
  }

  notLoggedInHeart() {
    return (
      <i className="material-icons logout-favorite col s2">favorite_border</i>
    );
  }

  clickHeart(id, fav) {
    if (!fav) {
      this.props.postFavorite(id);
    } else if (
      window.confirm(
        "Do you want to remove this itinerary from your favorites?"
      )
    ) {
      this.props.postFavorite(id);
    }
  }

  render() {
    return (
      <>
        {this.props.user.isLoggedIn
          ? this.loggedInHeart()
          : this.notLoggedInHeart()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { postFavorite }
)(Heart);
