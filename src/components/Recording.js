import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Recording = ({ recording }) => {
  // 🛠 Should move to a useVotes hook to manage votes incoming from recordings.
  const [hasVoted, setHasVoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);

  const vote = () => {
    const totalVotes = hasVoted
      ? upVotes - 1
      : upVotes + 1;

    setHasVoted(!hasVoted);
    setUpVotes(totalVotes);
  };

  return (
    <div>
      <div>
        <audio src={recording} key={recording} controls />
      </div>
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
