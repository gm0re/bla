import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserIcon from './UserIcon';
import Username from './Username';
import RecordingActions from './RecordingActions';

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: 6px;
  }
`;

const Player = styled.audio`
  height: 35px;
`;

const RecordingWrapper = styled.div`
  padding: 8px;
    background-color: white;
    border: 1px solid #00000008;
`;

const Timestamp = styled.div`
  margin: 4px;
  font-weight: lighter;
  font-size: small;
`;

const Recording = ({ recording }) => {
  const formatDate = dateString => {
    const options = {
      day: 'numeric',
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
      month: 'short',
      timezone: new Date().getTimezoneOffset(),
      year: 'numeric'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <RecordingWrapper>
      <PlayerWrapper>
        <UserIcon profilePic={recording.user.profilePic} />
        <div>
          <Username>{recording.user.username}</Username>
          <Player
            id={recording.id || recording.filename}
            key={recording.id || recording.filename}
            src={recording.filename}
            controls
          />
          <Timestamp>{formatDate(recording.createdAt)}</Timestamp>
        </div>
      </PlayerWrapper>
      <RecordingActions recording={recording} />
    </RecordingWrapper>
  )
};

Recording.propTypes = {
  recording: PropTypes.shape({
    createdAt: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      profilePic: PropTypes.string,
      username: PropTypes.string
    })
  })
};

export default Recording;
