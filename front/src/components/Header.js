import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BackButton from './BackButton';
import Username from './Username';
import UserIcon from './UserIcon';

const HeaderWrapper = styled.div`
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: ${({ showBackButton }) => (showBackButton ? 'space-between' : 'flex-end')};
  align-items: center;
  padding: ${({ theme }) => theme.global.space.padding.xl};
  border-bottom: ${({ theme }) => theme.border};

  > div {
    margin: ${({ theme }) => theme.global.space.margin.m};
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = ({ user }) => {
  const history = useHistory();

  // 🤔 doesn't seem right
  const showBackButton = () => (
    history.location.pathname !== '/recordings'
  );

  return (
    <HeaderWrapper showBackButton={showBackButton()}>
      {showBackButton() && (<BackButton history={history} />)}
      <UserWrapper>
        <UserIcon profilePic={user.profilePic} />
        <Username>{user.username}</Username>
      </UserWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    profilePic: PropTypes.string,
    username: PropTypes.string
  })
};

export default Header;
