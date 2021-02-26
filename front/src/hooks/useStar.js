import { useEffect, useState } from 'react';

import { recordingsSvc } from '../services';

const useStar = recording => {
  const [hasStarred, setHasStarred] = useState(false);

  // 👨‍🏭 hardcoded userId to be migrated with login
  const hasUserStarred = () => (
    recording.starredBy.some(({ id }) => id === 1)
  );

  const onStar = () => {
    console.log('fav');

    if (hasStarred) {
      recordingsSvc.deleteStar({
        recordingId: recording.id,
        userId: 1
      });
    } else {
      recordingsSvc.saveStar({
        recordingId: recording.id,
        userId: 1
      });
    }

    setHasStarred(!hasStarred);
  };

  useEffect(() => {
    setHasStarred(hasUserStarred());
  }, []);

  return [
    hasStarred,
    onStar
  ];
};

export default useStar;
