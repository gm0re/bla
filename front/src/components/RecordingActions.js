import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colors = {
  fav: 'red',
  inactive: 'grey'
};

const ActionIcon = styled(FontAwesomeIcon)`
  position: absolute;
  width: 16px !important;
  height: 19px;
  display: block;
  top: 3px;
  left: 4px;
`;

const ActionButtonShadow = styled.div`
  display: none;
  position: absolute;
  background-color: ${colors.fav};
  border-radius: 100%;
  width: 24px;
  height: 24px;
  opacity: 20%;
`;

const ActionButtonElemsContainer = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const UpVotes = styled.span``;

const RecordingActionButton = styled.button`
  &:hover ${ActionButtonShadow} {
    display: block;
  }
  &:hover ${ActionIcon} {
    color: ${colors.fav};
  }
  &:hover ${UpVotes} {
    color: ${colors.fav};
  }

  margin: 4px;
  display: flex;
  outline: none;
  border: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  flex-direction: row;
  align-items: center;

  > div {
    margin: 4px;
  }
`;

const RecordingActions = ({
  hasVoted,
  onVote,
  upVotes
}) => (
  <RecordingActionsWrapper>
    {/* <RecordingActionButton>Reply</RecordingActionButton> */}
    <RecordingActionButton onClick={onVote}>
      <UpVotes>{`${upVotes}`}</UpVotes>
      <ActionButtonElemsContainer>
        {hasVoted ? (
          <ActionIcon
            icon={['fas', 'heart']}
            color={colors.fav}
          />
        ) : (
          <ActionIcon
            icon={['far', 'heart']}
            color={`${hasVoted ? colors.fav : colors.inactive}`}
          />
        )}
        <ActionButtonShadow />
      </ActionButtonElemsContainer>
    </RecordingActionButton>
  </RecordingActionsWrapper>
);

RecordingActions.propTypes = {
  hasVoted: PropTypes.bool,
  onVote: PropTypes.func,
  upVotes: PropTypes.number
};

export default RecordingActions;
