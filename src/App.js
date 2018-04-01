import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
import axios from 'axios';
import qs from 'qs';
import ReactList from 'react-list';

import logo from './logo.svg';

import TopBar from './components/shared/TopBar';
import Place from './components/Place';

class App extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    favorites: [],
    restaurants: [],
    selectedList: 'places'
  };

  componentWillMount() {
    const restaurants = localStorage.getItem('restaurants');
    const favorites = localStorage.getItem('favorites');
    if (restaurants) {
      this.setState({ restaurants: JSON.parse(restaurants) });
    }
    if (favorites) {
      this.setState({ favorites: JSON.parse(favorites) });
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

  selectList = id => {
    this.setState({ selectedList: id });
  };

  renderRestaurant = (index, key) => {
    return (
      <Place
        key={key}
        id={this.state.restaurants[index].id}
        name={this.state.restaurants[index].name}
        favClick={this.favoriteRestaurant}
        favorited={this.state.favorites.includes(
          this.state.restaurants[index].id
        )}
      />
    );
  };

  renderFavorite = (index, key) => {
    return (
      <Place
        key={key}
        name={this.state.favorites[index]}
        favClick={this.favoriteRestaurant}
      />
    );
  };

  favoriteRestaurant = restaurantID => {
    let favorites = [...this.state.favorites];
    if (favorites.lenght > 0 && favorites.find(restaurantID)) {
      favorites = favorites.filter(favorite => {
        return favorite !== restaurantID;
      });
    } else {
      favorites.push(restaurantID);
    }
    this.setState({ favorites });
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  render() {
    console.log(this.state.restaurants);
    return (
      <div className={this.props.className}>
        <TopBar
          selectedList={this.state.selectedList}
          selectList={this.selectList}
        />
        {this.state.restaurants.length > 0 &&
          this.state.selectedList === 'places' &&
          this.state.restaurants.map(restaurant => {
            return (
              <Place
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                favClick={this.favoriteRestaurant}
                favorited={this.state.favorites.includes(restaurant.id)}
              />
            );
          })}
        {this.state.favorites.length > 0 &&
          this.state.selectedList === 'favs' &&
          this.state.restaurants
            .filter(restaurant => {
              return this.state.favorites.includes(restaurant.id);
            })
            .map(restaurant => {
              return (
                <Place
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  favClick={this.favoriteRestaurant}
                  favorited={this.state.favorites.includes(restaurant.id)}
                />
              );
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
  max-height: 100%;
`);
