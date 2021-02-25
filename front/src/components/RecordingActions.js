import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RecordingActionButton = styled.button`
  margin: 4px;
  outline: none;
  border: 0;
  background-color: Transparent;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const RecordingActions = ({
  hasVoted,
  onVote,
  upVotes
}) => (
  <RecordingActionsWrapper>
    {/* <RecordingActionButton>Reply</RecordingActionButton> */}
    <RecordingActionButton onClick={onVote}>
      {`${upVotes} `}
      <FontAwesomeIcon
        icon={['far', 'thumbs-up']}
        color={`${hasVoted ? 'green' : 'red'}`}
      />
    </RecordingActionButton>
  </RecordingActionsWrapper>
);

RecordingActions.propTypes = {
  hasVoted: PropTypes.bool,
  onVote: PropTypes.func,
  upVotes: PropTypes.number
};

export default RecordingActions;
