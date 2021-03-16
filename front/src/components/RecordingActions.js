import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useFav, useReply, useShare, useStar } from '../hooks';

import RecordingAction from './RecordingAction';

const RecordingActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ACTIONS_COLORS = {
  FAVED: '#ff0000',
  REPLIED: '#0070ff',
  SHARED: '#0dbb0d',
  STARRED: '#ffca00'
};

const RecordingActions = ({ recording }) => {
  const [favs, hasFaved, onFav] = useFav(recording);
  const [replies, hasReplied, onReply] = useReply(recording);
  const [hasShared, onShare] = useShare(recording);
  const [hasStarred, onStar] = useStar(recording);

  return (
    <RecordingActionsWrapper>
      <RecordingAction
        color={ACTIONS_COLORS.FAVED}
        count={favs}
        icon={hasFaved
          ? ['fas', 'heart']
          : ['far', 'heart']
        }
        isActive={hasFaved}
        onClick={onFav}
      />
      <RecordingAction
        color={ACTIONS_COLORS.REPLIED}
        count={replies}
        icon={hasReplied
          ? ['fas', 'comment']
          : ['far', 'comment']
        }
        isActive={hasReplied}
        onClick={onReply}
      />
      <RecordingAction
        color={ACTIONS_COLORS.STARRED}
        icon={hasStarred
          ? ['fas', 'star']
          : ['far', 'star']
        }
        isActive={hasStarred}
        onClick={onStar}
      />
      <RecordingAction
        color={ACTIONS_COLORS.SHARED}
        icon={hasShared
          ? ['fas', 'share-square']
          : ['far', 'share-square']
        }
        isActive={hasShared}
        onClick={onShare}
      />
    </RecordingActionsWrapper>
  );
};

RecordingActions.propTypes = {
  recording: PropTypes.shape({
    favs: PropTypes.number,
    replies: PropTypes.array,
    user: PropTypes.shape({
      hasFaved: PropTypes.bool,
      hasReplied: PropTypes.bool,
      hasShared: PropTypes.bool,
      hasStarred: PropTypes.bool
    })
  })
};

export default RecordingActions;
