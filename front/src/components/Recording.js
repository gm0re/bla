import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserIcon from './UserIcon';
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
`;

const Timestamp = styled.div`
  margin: 4px;
`;

const Username = styled.div`
  margin: 4px;
`;

const Recording = ({ recording }) => {
  // 🛠 move to a useVotes hook to manage votes incoming from recordings.
  const [hasVoted, setHasVoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);

  const onVote = () => {
    const totalVotes = hasVoted
      ? upVotes - 1
      : upVotes + 1;

    setHasVoted(!hasVoted);
    setUpVotes(totalVotes);
  };

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
    <div className="bg-white px-2 pt-2 mb-4 shadow-sm border-l border-r border-gray-100">
      <div className="flex items-center justify-center">
        <UserIcon username={recording.user.username} />
        <audio className="ml-1 flex-grow"
          id={recording.id || recording.filename}
          key={recording.id || recording.filename}
          src={recording.filename}
          controls
        />
      </div>
      <div className="flex place-content-between items-center">
        <div className="text-xs">{formatDate(recording.createdAt)}</div>
        <RecordingActions
          hasVoted={hasVoted}
          onVote={onVote}
          upVotes={upVotes}
        />
      </div>
    </div>
  )
};

Recording.propTypes = {
  recording: PropTypes.shape({
    createdAt: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default Recording;
