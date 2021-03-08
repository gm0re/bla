import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RecordingActions from './RecordingActions';
import Timestamp from './Timestamp';
import UserIcon from './UserIcon';
import Username from './Username';

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: 6px;
  }
`;

const Player = styled.audio`
  &:focus {
    outline: none;
  }
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
    background-color: ${({ detailed }) => (detailed ? '#f7f7f7' : '#e0dede')};
  }

  padding: 8px;
  cursor: pointer;
  background-color: ${({ detailed }) => (detailed ? 'white' : '#eaeaea')};

  ${({ detailed }) => (detailed && 'position: sticky; top: 0; z-index: 999;')}
  ${({ detailed }) => (detailed && 'box-shadow: 0px 9px 10px #eaeaea8c;')}

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
            src={`http://localhost:1337/${recording.filepath}`}
            type={recording.filetype}
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
