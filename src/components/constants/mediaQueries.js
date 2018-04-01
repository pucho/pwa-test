import { css } from 'styled-components';

const media = {
  tablet: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)};
    }
  `,
  tabletPortrait: (...args) => css`
    @media (max-width: 900px) {
      ${css(...args)};
    }
  `,
  mobile: (...args) => css`
    @media (max-width: 600px) {
      ${css(...args)};
    }
  `
};

export default media;
