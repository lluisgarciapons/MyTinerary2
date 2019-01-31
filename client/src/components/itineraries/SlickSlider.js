import React, { Component } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";

export class SlickSlider extends Component {
  //finds the activities for each itinerary
  findActivities = (itinerary, activities) => {
    return activities.filter(
      activity => activity.itinerary._id === itinerary._id
    );
  };

  render() {
    var settings = {
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: false
    };

    //activities for that specific Itinerary
    const activities = this.findActivities(
      this.props.itinerary,
      this.props.activities.payload
    );

    return (
      <div>
        <Slick ref="slick" {...settings}>
          {activities.map((activity, index) => (
            <div key={index}>
              {" "}
              <img src={activity.image} alt={activity.alt} />
            </div>
          ))}
        </Slick>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

export default connect(
  mapStateToProps,
  null
)(SlickSlider);
