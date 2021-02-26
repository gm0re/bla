import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useFav from '../hooks/useFav';
import RecordingAction from './RecordingAction';

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RecordingActions = ({
  recording
}) => {
  // 🛠 move to hooks to manage diff states
  const [hasReplied, setHasReplied] = useState(false);
  const [hasStarred, setHasStarred] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const [replies, setReplies] = useState(0);

  const [favs, hasFaved, onFav] = useFav();

  const onReply = () => {
    console.log('reply');
    const totalReplies = hasReplied
      ? replies - 1
      : replies + 1;

    setHasReplied(!hasReplied);
    setReplies(totalReplies);
  };

  const onShare = () => {
    console.log('share');
    setHasShared(!hasShared);
  };

  const onStar = () => {
    console.log('star');
    setHasStarred(!hasStarred);
  };

  return (
    <RecordingActionsWrapper>
      <RecordingAction
        color="red"
        count={recording.favs || favs}
        hasClickedOn={recording.user.hasFaved || hasFaved}
        icon={{
          active: ['fas', 'heart'],
          inactive: ['far', 'heart']
        }}
        onClick={() => onFav(recording)}
      />
      <RecordingAction
        color="blue"
        count={recording.replies || replies}
        hasClickedOn={recording.user.hasReplied || hasReplied}
        icon={{
          active: ['fas', 'comment'],
          inactive: ['far', 'comment']
        }}
        onClick={onReply}
      />
      <RecordingAction
        color="yellow"
        hasClickedOn={recording.user.hasStarred || hasStarred}
        icon={{
          active: ['fas', 'star'],
          inactive: ['far', 'star']
        }}
        onClick={onStar}
      />
      <RecordingAction
        color="green"
        hasClickedOn={recording.user.hasShared || hasShared}
        icon={{
          active: ['fas', 'share-square'],
          inactive: ['far', 'share-square']
        }}
        onClick={onShare}
      />
    </RecordingActionsWrapper>
  );
};

RecordingActions.propTypes = {
  recording: PropTypes.shape({
    favs: PropTypes.number,
    replies: PropTypes.number,
    user: PropTypes.shape({
      hasFaved: PropTypes.bool,
      hasReplied: PropTypes.bool,
      hasShared: PropTypes.bool,
      hasStarred: PropTypes.bool
    })
  })
};

export default RecordingActions;
