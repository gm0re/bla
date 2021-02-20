import React from 'react';
import styled from 'styled-components';

const EmptyFeedWrapper = styled.div`
  text-align: center;
`;

const EmptyFeed = () => (
  <EmptyFeedWrapper>
    No Recordings
  </EmptyFeedWrapper>
);

export default EmptyFeed;
