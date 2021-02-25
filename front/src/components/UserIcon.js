import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// 👷 hardcoded icon size > possible issue with randomly generated icons on BE
const iconSize = 48;

const ImgWrapper = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: ${iconSize}px;
  height: ${iconSize}px;
  min-width: ${iconSize}px;
  align-self: start;
`;

const UserIcon = ({ profilePic }) => (
  <ImgWrapper>
    <img src={`data:image/png;base64, ${profilePic}`} />
  </ImgWrapper>
);

UserIcon.propTypes = {
  profilePic: PropTypes.string
};

export default UserIcon;
