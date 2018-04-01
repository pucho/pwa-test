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
        <div
          id="places"
          className={`bar-child ${
            this.props.selectedList === 'places' ? 'selected' : ''
          }`}
          onClick={e => this.props.selectList(e.target.id)}
        >
          Places
        </div>
        <div
          id="favs"
          className={`bar-child ${
            this.props.selectedList === 'favs' ? 'selected' : ''
          }`}
          onClick={e => this.props.selectList(e.target.id)}
        >
          Favorites
        </div>
      </div>
    );
  }
}

export default styled(TopBar)`
  align-items: center;
  background-color: #1616b5;
  cursor: pointer;
  display: flex;
  height: 50px;
  line-height: 54px;
  margin-bottom: 30px;
  position: sticky;
  text-align: center;
  top: 0;
  z-index: 100;
  .bar-child {
    flex: 1;
    height: 100%;
  }
  .selected {
    background-color: #3d3dd8;
  }
`;
