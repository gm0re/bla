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
`;

const RecordingActions = ({
  hasVoted,
  onVote,
  upVotes
}) => (
  <div className="">
    {/* <RecordingActionButton>Reply</RecordingActionButton> */}
    <div onClick={onVote}>
      <FontAwesomeIcon
        icon={['far', 'thumbs-up']}
        color={`${hasVoted ? 'green' : 'red'}`}
        />{" "}
        {`${upVotes} `}
    </div>
  </div>
);

RecordingActions.propTypes = {
  hasVoted: PropTypes.bool,
  onVote: PropTypes.func,
  upVotes: PropTypes.number
};

export default RecordingActions;
