import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Places extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return <div className={this.props.className}>{this.props.name}</div>;
  }
}

export default styled(Places)`
  background-color: #f5f5f5;
  border-radius: 6px;
  box-shadow: 1px 2px rgba(0,0,0,0.2);
  color: black
  height: 60px;
  margin: 10px;
  padding: 2px;
  flex: 1;
`;
