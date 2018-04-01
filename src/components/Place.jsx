import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Favorite from './shared/Favorite';

class Place extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div
        className={this.props.className}
        onClick={e => {
          this.props.favClick(this.props.id);
        }}
      >
        <div className="resto-title">{this.props.name}</div>
        <Favorite interactive favorited={this.props.favorited} />
      </div>
    );
  }
}

export default styled(Place)`
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 6px;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
  color: black;
  display: flex;
  height: 60px;
  justify-content: space-around;
  margin: 10px;
  padding: 2px;
  flex: 1;
  .resto-title {
    flex: 0 0 90%;
  }
  .fav {
  }
`;
