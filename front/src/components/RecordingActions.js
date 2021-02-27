import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useFav, useShare, useStar } from '../hooks';
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
  const [replies, setReplies] = useState(0);

  const [favs, hasFaved, onFav] = useFav(recording);
  const [hasShared, onShare] = useShare(recording);
  const [hasStarred, onStar] = useStar(recording);

  const onReply = () => {
    console.log('reply');
    const totalReplies = hasReplied
      ? replies - 1
      : replies + 1;

    setHasReplied(!hasReplied);
    setReplies(totalReplies);
  };

  return (
    <RecordingActionsWrapper>
      <RecordingAction
        color="red"
        count={favs}
        hasClickedOn={hasFaved}
        icon={{
          active: ['fas', 'heart'],
          inactive: ['far', 'heart']
        }}
        onClick={onFav}
      />
      <RecordingAction
        color="#0070ff"
        count={replies}
        hasClickedOn={hasReplied}
        icon={{
          active: ['fas', 'comment'],
          inactive: ['far', 'comment']
        }}
        onClick={onReply}
      />
      <RecordingAction
        color="#ffca00"
        hasClickedOn={hasStarred}
        icon={{
          active: ['fas', 'star'],
          inactive: ['far', 'star']
        }}
        onClick={onStar}
      />
      <RecordingAction
        color="#0dbb0d"
        hasClickedOn={hasShared}
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
