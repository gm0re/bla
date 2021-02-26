import { useState } from 'react';

import { recordingsSvc } from '../services';

const useFav = () => {
  const [hasFaved, setHasFaved] = useState(false);
  const [favs, setFavs] = useState(0);

  const saveFav = fav => {
    recordingsSvc.fav(fav);
  };

  const onFav = recording => {
    console.log('fav');
    const totalFavs = hasFaved
      ? favs - 1
      : favs + 1;

    setHasFaved(!hasFaved);
    setFavs(totalFavs);

    saveFav({
      recordingId: recording.id,
      userId: 1
    });
  };

  return [
    favs,
    hasFaved,
    onFav
  ];
};

export default useFav;
