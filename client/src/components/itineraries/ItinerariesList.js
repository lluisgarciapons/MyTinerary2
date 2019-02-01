import React from "react";
import Itinerary from "./Itinerary.js";

function findComments(itinerary, comments) {
  return comments.filter(com => com.itinerary._id === itinerary._id);
}

const ItinerariesList = props => {
  return props.itineraries.map((itinerary, index) => (
    <Itinerary
      key={index}
      itinerary={itinerary}
      comments={findComments(itinerary, props.comments)}
    />
  ));
};

export default ItinerariesList;
