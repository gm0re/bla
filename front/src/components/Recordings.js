import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();

  const getIdFilter = () => (id ? { id } : { parent: null });

  const onScroll = ({ target }) => {
    const { scrollHeight, scrollTop, clientHeight } = target;
    const isAtBottom = () => scrollHeight - scrollTop === clientHeight;

    if (!isLastPageReached && isAtBottom()) {
      const newPage = page + 1;

      fetchRecordings(getIdFilter(), page, undefined, false);
      setPage(newPage);
    }
  };

  const doesAnimate = (recordingsList, recording) => (
    !!(recordingsList.indexOf(recording) === 0 && recordingsCreatedCount)
  );

  const setScrollOnTop = ({ element }) => {
    element.current.scrollTop = 0;
  };

  useEffect(() => {
    fetchRecordings(getIdFilter());
  }, [id]);

  useEffect(() => {
    if (recordingsCreatedCount && recordingsRef.current) {
      setScrollOnTop({ element: recordingsRef })
    }
  }, [recordingsCreatedCount]);

  return (
    <RecordingsWrapper onScroll={onScroll} ref={recordingsRef}>
      {recordings.length ? recordings.map(recording => (
        <div key={recording.id}>
          <Recording
            animate={!id && doesAnimate(recordings, recording)}
            isDetailed
            key={recording.id}
            recording={recording}
          />
          {!!recording.replies?.length && recording.replies.map(reply => (
            <Recording
              animate={id && doesAnimate(recording.replies, reply)}
              key={reply.id}
              recording={reply}
            />
          ))}
        </div>
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
