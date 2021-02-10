import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import identicon from 'identicon';
import uniqid from 'uniqid';

import RecordingActions from './RecordingActions';

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: 6px;
  }
`;

const ImgWrapper = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: 54px;
  height: 54px;
`;

const Recording = ({ recording }) => {
  // 🛠 move to a useVotes hook to manage votes incoming from recordings.
  const [hasVoted, setHasVoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);
  const [avatar, setAvatar] = useState();

  const avatarId = uniqid();

  const onVote = () => {
    const totalVotes = hasVoted
      ? upVotes - 1
      : upVotes + 1;

    setHasVoted(!hasVoted);
    setUpVotes(totalVotes);
  };

  useEffect(() => {
    // 👷 move to backend layer.
    identicon.generate({
      id: avatarId,
      size: 54
    }, (err, buffer) => {
      if (err) {
        console.error(err);
      }
      setAvatar(buffer);
    });
  }, []);

  return (
    <div>
      <PlayerWrapper>
        <ImgWrapper><img src={avatar} /></ImgWrapper>
        <div><audio src={recording} key={recording} controls /></div>
      </PlayerWrapper>
      <RecordingActions
        hasVoted={hasVoted}
        onVote={onVote}
        upVotes={upVotes}
      />
    </div>
  )
};

Recording.propTypes = {
  recording: PropTypes.string
};

export default Recording;
