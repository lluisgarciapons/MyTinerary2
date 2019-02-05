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

  async componentWillMount() {
    if (this.props.cities.payload.length === 0) {
      await this.props.fetchCities();
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
