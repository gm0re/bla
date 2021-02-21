import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import identicon from 'identicon';

import RecordingActions from './RecordingActions';

const RecordingWrapper = styled.div`
  padding: 8px;
`;

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

  console.log(recording);

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
      id: recording.user.username,
      size: 54
    }, (err, buffer) => {
      if (err) {
        console.error(err);
      }
      setAvatar(buffer);
    });
  }, []);

  return (
    <RecordingWrapper>
      <PlayerWrapper>
        <ImgWrapper><img src={avatar} /></ImgWrapper>
        <div><audio src={recording.filename} key={recording.id || recording.filename} controls /></div>
      </PlayerWrapper>
      <RecordingActions
        hasVoted={hasVoted}
        onVote={onVote}
        upVotes={upVotes}
      />
    </RecordingWrapper>
  )
};

Recording.propTypes = {
  recording: PropTypes.shape({
    filename: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default Recording;
