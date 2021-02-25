import React from 'react';
import PropTypes from 'prop-types';

import UserIcon from './UserIcon';

const Header = ({ user }) => (
  <div className="flex justify-end items-center p-2">
    <UserIcon
      username={user.username}
    />
  </div>
);

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  })
};

export default Header;
