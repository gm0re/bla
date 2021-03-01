import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useFav, useReply, useShare, useStar } from '../hooks';
import RecordingAction from './RecordingAction';

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RecordingActions = ({
  recording
}) => {
  const [favs, hasFaved, onFav] = useFav(recording);
  const [replies, hasReplied, onReply] = useReply(recording);
  const [hasShared, onShare] = useShare(recording);
  const [hasStarred, onStar] = useStar(recording);

  const onClickWrapper = (event, callback) => {
    event.stopPropagation();

    callback();
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
        onClick={event => onClickWrapper(event, onFav)}
      />
      <RecordingAction
        color="#0070ff"
        count={replies}
        hasClickedOn={hasReplied}
        icon={{
          active: ['fas', 'comment'],
          inactive: ['far', 'comment']
        }}
        onClick={event => onClickWrapper(event, onReply)}
      />
      <RecordingAction
        color="#ffca00"
        hasClickedOn={hasStarred}
        icon={{
          active: ['fas', 'star'],
          inactive: ['far', 'star']
        }}
        onClick={event => onClickWrapper(event, onStar)}
      />
      <RecordingAction
        color="#0dbb0d"
        hasClickedOn={hasShared}
        icon={{
          active: ['fas', 'share-square'],
          inactive: ['far', 'share-square']
        }}
        onClick={event => onClickWrapper(event, onShare)}
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
