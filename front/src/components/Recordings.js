import React from 'react';
import PropTypes from 'prop-types';

import Recording from './Recording';

const Recordings = ({ recordings }) => (
  <div className="flex flex-col h-96 overflow-auto">
    {!!recordings.length && recordings.map(recording => (
      <Recording recording={recording} key={recording.id || recording.filename } />
    ))}
  </div>
);

Recordings.propTypes = {
  recordings: PropTypes.arrayOf(PropTypes.object)
};

export default Recordings;
