import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import identicon from 'identicon';

const iconSize = 48;

const ImgWrapper = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: ${iconSize}px;
  height: ${iconSize}px;
  min-width: ${iconSize}px;
  align-self: start;
`;

const UserIcon = ({ username }) => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    // 👷 move to backend layer.
    identicon.generate({
      id: username,
      size: iconSize
    }, (error, buffer) => {
      if (error) {
        console.error(error);
      }
      setAvatar(buffer);
    });
  }, []);
  return (
    <div className="border rounded-full overflow-hidden">
      <img className="w-auto h-8" src={avatar} />
    </div>
  )
};

UserIcon.propTypes = {
  username: PropTypes.string
};

export default UserIcon;
