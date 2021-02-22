import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserIcon from './UserIcon';
import RecordingActions from './RecordingActions';

const RecordingWrapper = styled.div`
  padding: 8px;
`;

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: 6px;
  }
`;

const Recording = ({ recording }) => {
  // 🛠 move to a useVotes hook to manage votes incoming from recordings.
  const [hasVoted, setHasVoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);

  console.log(recording);

  const onVote = () => {
    const totalVotes = hasVoted
      ? upVotes - 1
      : upVotes + 1;

    setHasVoted(!hasVoted);
    setUpVotes(totalVotes);
  };

  return (
    <RecordingWrapper>
      <PlayerWrapper>
        <UserIcon
          username={recording.user.username}
        />
        <div>
          <audio
            src={recording.filename}
            key={recording.id || recording.filename}
            controls
          />
        </div>
      </PlayerWrapper>
      <RecordingActions
        hasVoted={hasVoted}
        onVote={onVote}
        upVotes={upVotes}
      />
    </RecordingWrapper>
  )
};

Recording.propTypes = {
  recording: PropTypes.shape({
    filename: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default Recording;
