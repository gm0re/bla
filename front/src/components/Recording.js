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
  align-items: center;
  justify-content: start;
  flex-direction: row;
  margin: 4px;
  line-height: 18px;
`;

const RecordingWrapper = styled.div`
  &:hover {
    background-color: #f7f7f7;
  }
  padding: 8px;
  background-color: white;
  border: 1px solid #00000008;
  cursor: pointer;

  ${({ animate }) => (animate && 'animation: color-me-in 5s;')}

  @keyframes color-me-in {
    0% {
      background: orange;
    }
    100% {
      background: white;
    }
  }
`;

const Separator = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`;

const Recording = ({
  animate,
  fetchRecordings,
  recording
}) => {
  const onRecordingClick = () => {
    console.log('rec click', recording);
    fetchRecordings(0, { parent: recording.id }, undefined, true);
  };

  return (
    <RecordingWrapper
      animate={animate}
      onClick={onRecordingClick}
    >
      <PlayerWrapper>
        <UserIcon profilePic={recording.user.profilePic} />
        <div>
          <RecordingHeader>
            <Username>{recording.user.username}</Username>
            <Separator>·</Separator>
            <Timestamp relative>{recording.createdAt}</Timestamp>
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
};

Recording.propTypes = {
  animate: PropTypes.bool,
  fetchRecordings: PropTypes.func,
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
