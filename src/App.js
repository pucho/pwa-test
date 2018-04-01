import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
import axios from 'axios';
import qs from 'qs';

import logo from './logo.svg';

import TopBar from './components/shared/TopBar';
import Places from './components/Places';

class App extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    restaurants: []
  };

  componentWillMount() {
    const cachedHits = localStorage.getItem('restaurants');
    if (cachedHits) {
      this.setState({ restaurants: JSON.parse(cachedHits) });
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.coords);
    if (nextProps.coords) {
      this.getRestaurantsByLoc(nextProps.coords);
    }
  }

  getRestaurantsByLoc = coords => {
    const queryString = qs.stringify({
      client_id: process.env.REACT_APP_FS_CLIENTID,
      client_secret: process.env.REACT_APP_FS_CLIENTSECRET,
      ll: `${coords.latitude}, ${coords.longitude}`,
      query: 'restaurant',
      radius: 1000,
      v: '20180323'
    });
    axios
      .get(`https://api.foursquare.com/v2/venues/search?${queryString}`)
      .then(data => {
        this.setState({ restaurants: data.data.response.venues });
        localStorage.setItem(
          'restaurants',
          JSON.stringify(data.data.response.venues)
        );
      });
  };
  render() {
    console.log(this.props);
    return (
      <div className={this.props.className}>
        <TopBar />
        {this.state.restaurants.length > 0 &&
          this.state.restaurants.map(restaurant => {
            return <Places key={restaurant.id} name={restaurant.name} />;
          })}
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 300
})(styled(App)`
  background-color: #3d3dd8;
  color: white;
  height: 100vh;
`);
