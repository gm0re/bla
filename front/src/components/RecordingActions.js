import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RecordingAction from './RecordingAction';

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RecordingActions = ({
  recording
}) => {
  // 🛠 move to a useVotes hook to manage votes incoming from recordings.
  const [hasFaved, setHasFaved] = useState(false);
  const [hasReplied, setHasReplied] = useState(false);
  const [hasStarred, setHasStarred] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const [favs, setFavs] = useState(0);

  const onFav = () => {
    console.log('fav');
    const totalFavs = hasFaved
      ? favs - 1
      : favs + 1;

    setHasFaved(!hasFaved);
    setFavs(totalFavs);
  };

  const onReply = () => {
    console.log('reply');
    setHasReplied(!hasReplied);
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
        onClick={onFav}
      />
      <RecordingAction
        color="blue"
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
    user: PropTypes.shape({
      hasFaved: PropTypes.bool,
      hasReplied: PropTypes.bool,
      hasShared: PropTypes.bool,
      hasStarred: PropTypes.bool
    })
  })
};

export default RecordingActions;
