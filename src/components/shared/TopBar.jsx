import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class TopBar extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className="bar-child">Places</div>
        <div className="bar-child">Favorites</div>
      </div>
    );
  }
}

export default styled(TopBar)`
  align-items: center;
  border-bottom: 2px solid grey;
  display: flex;
  height: 50px;
  text-align: center;
  :first-child {
    border-right: 2px solid grey;
  }
  .bar-child {
    flex: 1;
  }
`;
