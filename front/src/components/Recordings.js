import React, { useEffect, useRef, useState } from 'react';
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

const Recordings = ({
  fetchRecordings,
  recordings,
  recordingsCreatedCount
}) => {
  const [page, setPage] = useState(1);
  const recordingsRef = useRef(null);

  const onScroll = ({ target }) => {
    const { scrollHeight, scrollTop, clientHeight } = target;
    const isAtBottom = () => scrollHeight - scrollTop === clientHeight;

    if (isAtBottom()) {
      const newPage = page + 1;

      fetchRecordings(page);
      setPage(newPage);
    }
  }

  const resetScrollEffect = ({ element }) => {
    element.current.scrollTop = 0;
  }

  useEffect(() => {
    if (recordingsCreatedCount && recordingsRef.current) {
      resetScrollEffect({ element: recordingsRef })
    }
  }, [recordingsCreatedCount]);

  return (
    <RecordingsWrapper onScroll={onScroll} ref={recordingsRef}>
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
  recordings: PropTypes.arrayOf(PropTypes.object),
  recordingsCreatedCount: PropTypes.number
};

export default Recordings;
