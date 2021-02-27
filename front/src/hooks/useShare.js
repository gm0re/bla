import { useEffect, useState } from 'react';

import recordingsSvc from '../services/recordings';

const useShare = recording => {
  const [hasShared, setHasShared] = useState(false);

  // 👨‍🏭 hardcoded userId to be migrated with login
  const hasUserShared = () => (
    recording.sharedBy.some(({ id }) => id === 1)
  );

  const onShare = () => {
    if (hasShared) {
      recordingsSvc.deleteShare({
        recordingId: recording.id,
        userId: 1
      });
    } else {
      recordingsSvc.saveShare({
        recordingId: recording.id,
        userId: 1
      });
    }

    setHasShared(!hasShared);
  };

  useEffect(() => {
    setHasShared(hasUserShared());
  }, []);

  return [
    hasShared,
    onShare
  ];
};

export default useShare;
