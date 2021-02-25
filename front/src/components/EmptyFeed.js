import React from 'react';
import styled from 'styled-components';

const EmptyFeedWrapper = styled.div`
  text-align: center;
`;

const EmptyFeed = () => (
  <div className="text-center border">
    No Recordings
  </div>
);

export default EmptyFeed;
