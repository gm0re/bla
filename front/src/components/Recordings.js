import React from 'react';
import PropTypes from 'prop-types';

import Recording from './Recording';

const Recordings = ({ recordings }) => (
  recordings && recordings.map(recording => (
    <Recording recording={recording} key={recording.id} />
  ))
);

Recordings.propTypes = {
  recordings: PropTypes.arrayOf(PropTypes.object)
};

export default Recordings;
