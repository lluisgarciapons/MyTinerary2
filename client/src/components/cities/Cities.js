import React, { Component } from "react";
import CitiesList from "./CitiesList";
import CityFilter from "./CityFilter";
import Footer from "../Footer.js";
import { connect } from "react-redux";
import { fetchCities } from "../../store/actions/citiesActions";

export class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: []
    };
  }

  componentWillMount() {
    if (this.props.cities.payload.length === 0) {
      this.props.fetchCities();
      return;
    }
    this.setState({ filteredCities: this.props.cities.payload });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cities !== this.props.cities) {
      this.setState({ filteredCities: nextProps.cities.payload });
    }
  }

  filterCities = cityFilter => {
    let filteredCities = this.props.cities.payload;
    filteredCities = filteredCities.filter(city => {
      let cityName = city.name.toLowerCase() + city.country.toLowerCase();
      return cityName.indexOf(cityFilter.toLowerCase()) !== -1;
    });
    this.setState({
      filteredCities
    });
    console.log("filtered cities:", this.state.filteredCities);
  };

  loader() {
    // <img src="image.svg" onerror="this.onerror=null; this.src='image.png'"></img>
    // return (
    //   <div className="preloader-wrapper big active">
    //     <div className="spinner-layer spinner-blue-only">
    //       <div className="circle-clipper left">
    //         <div className="circle" />
    //       </div>
    //       <div className="gap-patch">
    //         <div className="circle" />
    //       </div>
    //       <div className="circle-clipper right">
    //         <div className="circle" />
    //       </div>
    //     </div>
    //   </div>
    // );
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

  content() {
    console.log("cities");
    return (
      <div>
        <CityFilter onChange={this.filterCities} />
        <div id="all-cities" className="all-cities">
          <CitiesList cities={this.state.filteredCities} />
        </div>
      </div>
    );
  }

  render() {
    localStorage.setItem("url", this.props.match.url);
    return (
      <div>
        {!this.props.cities.isLoading ? this.content() : this.loader()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

export default connect(
  mapStateToProps,
  { fetchCities }
)(Cities);
