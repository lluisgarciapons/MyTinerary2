import React, { Component } from "react";
import ItinerariesList from "./ItinerariesList";
import Footer from "../Footer";
import { connect } from "react-redux";
import { fetchItineraries } from "../../store/actions/itinerariesActions";
import { fetchActivities } from "../../store/actions/activitiesActions";
import {
  fetchComments,
  postComment,
  deleteComment
} from "../../store/actions/commentsActions";
import M from "materialize-css";

export class Itineraries extends Component {
  async componentDidMount() {
    await this.props.fetchItineraries(this.props.match.params.id);
    await this.props.fetchActivities(this.props.match.params.id);
    await this.props.fetchComments(this.props.match.params.id);
  }

  componentDidUpdate() {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, { inDuration: 300 });
  }

  loader() {
    return (
      <div>
        <div className="lds-css ng-scope">
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }

  getCity() {
    return (
      this.props.itineraries.payload
        .map(itinerary => itinerary.city.name)
        .reduce((previous, current) => {
          return current;
        }, null) || "Bro, this city has no itineraries yet. Be patient"
    );
  }

  content() {
    if (Object.keys(this.props.itineraries.error).length === 0) {
      return (
        <div className="itinerary-city">
          <h1>{this.getCity()}</h1>
          <ul className="collapsible">
            <ItinerariesList itineraries={this.props.itineraries.payload} />
          </ul>
        </div>
      );
    } else {
      return (
        <>
          <div className="alert">
            <p>{this.props.itineraries.error.message}</p>
          </div>
        </>
      );
    }
  }

  render() {
    localStorage.setItem("url", this.props.match.url);
    return (
      <div className="itineraries">
        {!this.props.itineraries.isLoading ? this.content() : this.loader()}
        <Footer goBack={"cities"} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  {
    fetchItineraries,
    fetchActivities,
    fetchComments,
    postComment,
    deleteComment
  }
)(Itineraries);
