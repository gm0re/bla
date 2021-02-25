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
  };

  const onShare = () => {
    console.log('share');
  };

  const onStar = () => {
    console.log('star');
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
      {/* <RecordingAction
        onClick={onReply}
      />
      <RecordingAction
        onClick={onStar}
      />
      <RecordingAction
        onClick={onShare}
      /> */}
    </RecordingActionsWrapper>
  );
};

RecordingActions.propTypes = {
  recording: PropTypes.shape({
    favs: PropTypes.number,
    user: PropTypes.shape({
      hasFaved: PropTypes.bool
    })
  })
};

export default RecordingActions;
