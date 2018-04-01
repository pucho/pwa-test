import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// SVG from https://css-tricks.com/hearts-in-html-and-css/

const heartPop = keyframes`
       50% {
        width: 25px;
      }
      100% {
       width: 20px;
     }
    `;

const StyledFavorite = styled.svg`
  cursor: ${props => (props.interactive ? 'pointer' : '')};
  fill: #d3d3d3;
  position: relative;
  transition: fill 0.2s ease-out;
  width: ${props => (props.width ? props.width : '20px')};
  :hover {
    fill: ${props => (props.interactive ? '#e7e7e7' : '#d3d3d3')};
  }

  ${props =>
    props.favorited &&
    css`
      fill: #ff0000;
      transition: fill 0.25s ease-out;
      animation: ${heartPop} 0.18s ease-in;
      :hover {
        fill: ${props => (props.interactive ? '#e20000' : '#ff0000')};
      }
    `};
`;

const Favorite = props => (
  <div className={props.className}>
    <StyledFavorite
      viewBox="0 0 32 29.6"
      favorited={props.favorited}
      interactive={props.interactive}
      width={props.width}
    >
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
  	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </StyledFavorite>
  </div>
);

export default Favorite;
