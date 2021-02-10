import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RecordingActions = ({
  hasVoted,
  onVote,
  upVotes
}) => (
  <RecordingActionsWrapper>
    {/* <button>Reply</button> */}
    <button onClick={onVote}>
      {`${upVotes} `}
      <FontAwesomeIcon
        icon={["far", "thumbs-up"]}
        color={`${hasVoted ? 'green' : 'red'}`}
      />
    </button>
  </RecordingActionsWrapper>
);

RecordingActions.propTypes = {
  hasVoted: PropTypes.bool,
  onVote: PropTypes.func,
  upVotes: PropTypes.number
};

export default RecordingActions;
