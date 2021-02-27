import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserIcon from './UserIcon';
import Username from './Username';
import RecordingActions from './RecordingActions';
import Timestamp from './Timestamp';

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

const RecordingHeader = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
`;

const RecordingWrapper = styled.div`
  padding: 8px;
    background-color: white;
    border: 1px solid #00000008;
`;

const Recording = ({ recording }) => (
  <RecordingWrapper>
    <PlayerWrapper>
      <UserIcon profilePic={recording.user.profilePic} />
      <div>
        <RecordingHeader>
          <Username>{recording.user.username}</Username> <Timestamp relative>{recording.createdAt}</Timestamp>
        </RecordingHeader>
        <Player
          id={recording.id || recording.filename}
          key={recording.id || recording.filename}
          src={recording.filename}
          controls
        />
      </div>
    </PlayerWrapper>
    <RecordingActions recording={recording} />
  </RecordingWrapper>
);

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
