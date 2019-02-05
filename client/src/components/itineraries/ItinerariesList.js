import React from "react";
import Itinerary from "./Itinerary.js";

const ItinerariesList = props => {
  return props.itineraries.map((itinerary, index) => (
    <Itinerary key={index} itinerary={itinerary} />
  ));
};

export default ItinerariesList;
