import React from 'react';
import styled from 'styled-components';

const SubHeaderWrappper = styled.div`
  position: sticky;
  border-bottom: ${({ theme }) => theme.border};
`;

const SubHeader = () => (
  <SubHeaderWrappper>
    Filters
  </SubHeaderWrappper>
);

export default SubHeader;
