import React, { Component } from "react";
import SlickSlider from "./SlickSlider";

function HastagList(props) {
  return props.hastags.map(hastag => <Hastag key={hastag} hastag={hastag} />);
}

function Hastag(props) {
  return <p>#{props.hastag}</p>;
}

export class Itinerary extends Component {
  render() {
    const itinerary = this.props.itinerary;
    return (
      <li className="itinerary">
        <div className="collapsible-header row">
          <div className="col s3 profile">
            <div className="profile-image-container">
              <img
                src={itinerary.user.profilePicture}
                alt={itinerary.user.userName}
                className="profile-picture"
              />
            </div>
            <h4>{itinerary.user.userName}</h4>
          </div>
          <div className="col s8 offset-s1 info">
            <h3 className="col s12">{itinerary.title}</h3>

            <div className="col s4">
              <h4>Likes: {itinerary.likes}</h4>
            </div>
            <div className="col s4">
              <h4>Hours: {itinerary.time}</h4>
            </div>
            <div className="col s4">
              <h4>
                Price: <span className="price">{itinerary.price}</span>
              </h4>
            </div>
            <HastagList hastags={itinerary.hastags} />
          </div>
        </div>
        <div className="collapsible-body">
          <h3>Find the best activities!</h3>
          <SlickSlider itinerary={itinerary} />
        </div>
      </li>
    );
  }
}

export default Itinerary;
