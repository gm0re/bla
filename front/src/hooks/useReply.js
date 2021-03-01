import { useEffect, useState } from 'react';

import recordingsSvc from '../services/recordings';

const useShare = recording => {
  const [hasReplied, setHasReplied] = useState(false);
  const [replies, setReplies] = useState(0);

  // 👨‍🏭 hardcoded userId to be migrated with login
  const hasUserReplied = () => (
    recording.repliedBy?.some(({ id }) => id === 1)
  );

  const onShare = () => {
    const totalReplies = hasReplied
      ? replies - 1
      : replies + 1;

    if (hasReplied) {
      recordingsSvc.deleteReply({
        recordingId: recording.id,
        userId: 1
      });
    } else {
      recordingsSvc.saveReply({
        recordingId: recording.id,
        userId: 1
      });
    }

    setHasReplied(!hasReplied);
    setReplies(totalReplies);
  };

  useEffect(() => {
    setReplies(recording.repliedBy?.length || 0);
    setHasReplied(hasUserReplied());
  }, []);

  return [
    replies,
    hasReplied,
    onShare
  ];
};

export default useShare;
