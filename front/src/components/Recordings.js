import React from 'react';
import Recording from './Recording';

const Recordings = ({ recordings }) => (
  recordings && recordings.map(recording => (
    <Recording recording={recording} key={recording} />
  ))
);

export default Recordings;
