import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import identicon from 'identicon';

const ImgWrapper = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: 54px;
  height: 54px;
  min-width: 54px;
`;

const UserIcon = ({ username }) => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    // 👷 move to backend layer.
    identicon.generate({
      id: username,
      size: 54
    }, (err, buffer) => {
      if (err) {
        console.error(err);
      }
      setAvatar(buffer);
    });
  }, []);
  return (
    <ImgWrapper>
      <img src={avatar} />
    </ImgWrapper>
  )
};

UserIcon.propTypes = {
  username: PropTypes.string
};

export default UserIcon;
