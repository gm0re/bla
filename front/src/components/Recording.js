import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RecordingActions from './RecordingActions';
import Timestamp from './Timestamp';
import UserIcon from './UserIcon';
import Username from './Username';
import Player from './Player';

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: ${({ theme }) => theme.global.space.margin.l};
  }
`;

const RecordingWrapper = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.global.space.margin.xl};
  background-color: ${({ theme, isDetailed }) => (
    isDetailed
      ? theme.background.primary
      : theme.background.secondary
  )};
  border-bottom: ${({ theme }) => theme.border};

  ${({ isDetailed }) => (isDetailed && (
    'position: sticky; top: 0; z-index: 999;'
  ))}

  ${({ animate }) => (animate && (
    'animation: color-me-in 3s;'
  ))}

  @keyframes color-me-in {
    0% {
      background: orange;
    }
    100% {
      background: ${({ theme, isDetailed }) => (
        isDetailed
          ? theme.background.primary
          : theme.background.secondary
      )};
    }
  }
`;

const Recording = ({
  animate,
  isDetailed,
  recording
}) => {
  const history = useHistory();

  const onRecordingClick = () => {
    history.push(`/recordings/${recording.id}`);
  };

  return (
    <RecordingWrapper
      animate={animate}
      isDetailed={isDetailed}
      onClick={onRecordingClick}
    >
      <PlayerWrapper>
        <Player
          isDetailed={isDetailed}
          playButton={<UserIcon profilePic={recording.user.profilePic} />}
          recording={recording}
          subtitle={<Timestamp relative>{recording.createdAt}</Timestamp>}
          title={<Username>{recording.user.username}</Username>}
        />
      </PlayerWrapper>
      <RecordingActions recording={recording} />
    </RecordingWrapper>
  );
};

Recording.propTypes = {
  animate: PropTypes.bool,
  isDetailed: PropTypes.bool,
  recording: PropTypes.shape({
    createdAt: PropTypes.string,
    filename: PropTypes.string,
    filepath: PropTypes.string,
    filetype: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      profilePic: PropTypes.string,
      username: PropTypes.string
    })
  })
};

export default Recording;
