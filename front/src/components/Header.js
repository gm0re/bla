import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserIcon from './UserIcon';

const HeaderWrapper = styled.div`
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 999;
`;

const Header = ({ user }) => (
  <HeaderWrapper>
    <UserIcon
      username={user.username}
    />
    <span>{user.username}</span>
  </HeaderWrapper>
);

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  })
};

export default Header;
