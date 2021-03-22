import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }

  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
`;

const Anchor = ({ link, label }) => (
  <StyledLink to={link}>
    {label}
  </StyledLink>
);

Anchor.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  link: PropTypes.string
};

export default Anchor;
