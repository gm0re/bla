import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserIcon from './UserIcon';

const HeaderWrapper = styled.div`
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  z-index: 999;
  padding: 8px;

  > div {
    margin: 4px;
  }
`;

const Header = ({ user }) => (
  <HeaderWrapper>
    <UserIcon profilePic={user.profilePic} />
    <div>{user.username}</div>
  </HeaderWrapper>
);

Header.propTypes = {
  user: PropTypes.shape({
    profilePic: PropTypes.string,
    username: PropTypes.string
  })
};

export default Header;
