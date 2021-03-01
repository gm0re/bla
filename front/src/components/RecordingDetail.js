import React from 'react';

import Recordings from './Recordings';

import { useRecordings } from '../hooks';

const RecordingDetail = () => {
  console.log('detail');

  const [recordings] = useRecordings();

  return (
    <div>
      <Recordings recordings={recordings} />
    </div>
  );
};

export default RecordingDetail;
