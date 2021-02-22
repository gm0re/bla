import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 64px;
  position: fixed;
`;

const Header = ({ user }) => (
  <HeaderWrapper>
    <span>{user.username}</span>
  </HeaderWrapper>
);

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  })
};

export default Header;
