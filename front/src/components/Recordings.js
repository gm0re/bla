import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Recording from './Recording';
import EmptyFeed from './EmptyFeed';

const RecordingsWrapper = styled.div`
  height: 584px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const Recordings = ({ recordings, fetchRecordings }) => {
  const [page, setPage] = useState(1);

  const onScroll = ({ target }) => {
    const { scrollHeight, scrollTop, clientHeight } = target
    const isAtBottom = () => scrollHeight - scrollTop === clientHeight;

    if (isAtBottom()) {
      console.log('bottom');
      const newPage = page + 1;

      fetchRecordings(page);
      setPage(newPage);
    }
  }

  return (
    <RecordingsWrapper onScroll={onScroll}>
      {recordings.length ? recordings.map(recording => (
        <Recording recording={recording} key={recording.id || recording.filename } />
      )) : (
        <EmptyFeed />
      )}
    </RecordingsWrapper>
  );
};

Recordings.propTypes = {
  fetchRecordings: PropTypes.func,
  recordings: PropTypes.arrayOf(PropTypes.object)
};

export default Recordings;
