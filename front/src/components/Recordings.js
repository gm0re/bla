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
  isLastPageReached,
  recordings,
  recordingsCreatedCount
}) => {
  const [page, setPage] = useState(1);
  const recordingsRef = useRef(null);

  const onScroll = ({ target }) => {
    const { scrollHeight, scrollTop, clientHeight } = target;
    const isAtBottom = () => scrollHeight - scrollTop === clientHeight;

    if (!isLastPageReached && isAtBottom()) {
      const newPage = page + 1;

      fetchRecordings(page);
      setPage(newPage);
    }
  }

  const doesAnimate = recording => (
    !!(recordings.indexOf(recording) === 0 && recordingsCreatedCount)
  );

  const setScrollOnTop = ({ element }) => {
    element.current.scrollTop = 0;
  }

  useEffect(() => {
    if (recordingsCreatedCount && recordingsRef.current) {
      setScrollOnTop({ element: recordingsRef })
    }
  }, [recordingsCreatedCount]);

  return (
    <RecordingsWrapper onScroll={onScroll} ref={recordingsRef}>
      {recordings.length ? recordings.map(recording => (
        <Recording
          animate={doesAnimate(recording)}
          fetchRecordings={fetchRecordings}
          key={recording.id}
          recording={recording}
        />
      )) : (
        <EmptyFeed />
      )}
    </RecordingsWrapper>
  );
};

Recordings.propTypes = {
  fetchRecordings: PropTypes.func,
  isLastPageReached: PropTypes.bool,
  recordings: PropTypes.arrayOf(PropTypes.object),
  recordingsCreatedCount: PropTypes.number
};

export default Recordings;
