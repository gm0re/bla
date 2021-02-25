import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Recording from './Recording';

const RecordingsWrapper = styled.div`
  height: 584px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const Recordings = ({ recordings }) => (
  <RecordingsWrapper>
    {!!recordings.length && recordings.map(recording => (
      <Recording recording={recording} key={recording.id || recording.filename } />
    ))}
  </RecordingsWrapper>
);

Recordings.propTypes = {
  recordings: PropTypes.arrayOf(PropTypes.object)
};

export default Recordings;
