import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Recording from './Recording';
import EmptyFeed from './EmptyFeed';

import useRecordings from '../hooks/useRecordings';

const RecordingsWrapper = styled.div`
  height: 584px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const Recordings = () => {
  const {
    fetchRecordings,
    isLastPageReached,
    recordings,
    recordingsCreatedCount
  } = useRecordings();

  const [page, setPage] = useState(1);
  const recordingsRef = useRef(null);
  const { id } = useParams();

  const getIdFilter = () => (id ? { id } : { parent: null });

  const onScroll = ({ target }) => {
    const { scrollHeight, scrollTop, clientHeight } = target;
    const isAtBottom = () => scrollHeight - scrollTop === clientHeight;

    if (!isLastPageReached && isAtBottom()) {
      const newPage = page + 1;

      fetchRecordings(getIdFilter(), page);
      setPage(newPage);
    }
  };

  const doesAnimate = recording => (
    !!(recordings.indexOf(recording) === 0 && recordingsCreatedCount)
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
            animate={doesAnimate(recording)}
            detailed
            key={recording.id}
            recording={recording}
          />
          {!!recording.replies?.length && recording.replies.map(reply => (
            <Recording
              animate={doesAnimate(reply)}
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

export default Recordings;
