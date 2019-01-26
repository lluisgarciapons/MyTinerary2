import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";

export class CityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityFilter: ""
    };
  }

  handleChange = e => {
    this.setState({
      cityFilter: e.target.value
    });
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="input-field col s12">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              // placeholder="Placeholder"
              id="first_name"
              type="text"
              className="validate"
              value={this.state.cityFilter}
              onChange={this.handleChange}
            />
            <label htmlFor="first_name">Search</label>
          </div>
        </div>
      </div>
    );
  }
}

export default CityFilter;
