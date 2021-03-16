import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgWrapper = styled.div`
  overflow: hidden;
  border-radius: 100%;
  width: ${({ theme }) => theme.global.icon.m};
  height: ${({ theme }) => theme.global.icon.m};
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
