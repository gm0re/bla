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
  &:hover {
    background-color: ${({ theme, detailed }) => (
      detailed
        ? theme.background.secondary
        : theme.background.tertiary
    )};
  }

  cursor: pointer;
  padding: ${({ theme }) => theme.global.space.margin.xl};
  background-color: ${({ theme, detailed }) => (
    detailed
      ? theme.background.primary
      : theme.background.tertiary
  )};
  border-bottom: ${({ theme }) => theme.border};

  ${({ detailed }) => (detailed && (
    'position: sticky; top: 0; z-index: 999;'
  ))}

  ${({ theme, detailed }) => (detailed && (
    `box-shadow: ${theme.boxShadow};`
  ))}

  ${({ animate }) => (animate && (
    'animation: color-me-in 5s;'
  ))}

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
  margin-left: ${({ theme }) => theme.global.space.margin.m};
  margin-right: ${({ theme }) => theme.global.space.margin.m};
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const Recording = ({
  animate,
  detailed,
  recording
}) => {
  const history = useHistory();

  const onRecordingClick = () => {
    history.push(`/recordings/${recording.id}`);
  };

  return (
    <RecordingWrapper
      animate={animate}
      detailed={detailed}
      onClick={onRecordingClick}
    >
      <PlayerWrapper>
        <Player
          header={
            <HeaderWrapper>
              <Username>{recording.user.username}</Username>
              <Separator>·</Separator>
              <Timestamp relative>{recording.createdAt}</Timestamp>
            </HeaderWrapper>
          }
          playButton={<UserIcon profilePic={recording.user.profilePic} />}
          recording={recording}
        />
      </PlayerWrapper>
      <RecordingActions recording={recording} />
    </RecordingWrapper>
  );
};

Recording.propTypes = {
  animate: PropTypes.bool,
  detailed: PropTypes.bool,
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
