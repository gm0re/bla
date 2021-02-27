import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

import UserIcon from "./UserIcon";
import RecordingActions from "./RecordingActions";

const Recording = ({ recording }) => {
  // 🛠 move to a useVotes hook to manage votes incoming from recordings.
  const [hasVoted, setHasVoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);

  const onVote = () => {
    const totalVotes = hasVoted ? upVotes - 1 : upVotes + 1;

    setHasVoted(!hasVoted);
    setUpVotes(totalVotes);
  };

  const formatDate = (dateString) => dayjs().to(dayjs(dateString));

  return (
    <div className="bg-white p-2 border-b border-gray-100">
      <div className="flex items-center justify-center">
        <UserIcon username={recording.user.username} />
        <audio
          className="ml-1 flex-grow"
          id={recording.id || recording.filename}
          key={recording.id || recording.filename}
          src={recording.filename}
          controls
        />
      </div>
      <div className="flex place-content-between items-center pt-2">
        <div className="text-xs text-gray-500" title={recording.createdAt}>
          {formatDate(recording.createdAt)}
        </div>
        <RecordingActions
          hasVoted={hasVoted}
          onVote={onVote}
          upVotes={upVotes}
        />
      </div>
    </div>
  );
};

Recording.propTypes = {
  recording: PropTypes.shape({
    createdAt: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default Recording;
