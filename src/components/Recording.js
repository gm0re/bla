import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import identicon from 'identicon';
import uniqid from 'uniqid';

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
  // 🛠 Should move to a useVotes hook to manage votes incoming from recordings.
  const [hasVoted, setHasVoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);
  const [avatar, setAvatar] = useState();

  const avatarId = uniqid();

  const vote = () => {
    const totalVotes = hasVoted
      ? upVotes - 1
      : upVotes + 1;

    setHasVoted(!hasVoted);
    setUpVotes(totalVotes);
  };

  useEffect(() => {
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
      {/* <button>Reply</button> */}
      <button onClick={vote}>
        {`${upVotes} `}
        <FontAwesomeIcon
          icon={["far", "thumbs-up"]}
          color={`${hasVoted ? 'green' : 'red'}`}
        />
      </button>
    </div>
  )
};

Recording.propTypes = {
  recording: PropTypes.string
};

export default Recording;
