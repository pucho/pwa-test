import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import logo from './logo.svg';

import TopBar from './components/shared/TopBar';
import Places from './components/Places';

class App extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={this.props.className}>
        <TopBar />
      </div>
    );
  }
}

export default styled(App)`
  background-color: #3d3dd8;
  color: white;
  height: 100vh;
`;
