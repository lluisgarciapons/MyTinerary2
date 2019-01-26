import React from "react";
import City from "./City";

const CitiesList = ({ cities }) =>
  cities.map(city => <City key={city.name} city={city} />);

export default CitiesList;
