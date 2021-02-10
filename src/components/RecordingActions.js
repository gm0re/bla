import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RecordingActions = ({
  hasVoted,
  onVote,
  upVotes
}) => (
  <div>
    {/* <button>Reply</button> */}
    <button onClick={onVote}>
      {`${upVotes} `}
      <FontAwesomeIcon
        icon={["far", "thumbs-up"]}
        color={`${hasVoted ? 'green' : 'red'}`}
      />
    </button>
  </div>
);

RecordingActions.propTypes = {
  hasVoted: PropTypes.bool,
  onVote: PropTypes.func,
  upVotes: PropTypes.number
};

export default RecordingActions;
