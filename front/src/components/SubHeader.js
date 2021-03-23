import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubHeaderWrappper = styled.div`
  position: sticky;
  border-bottom: ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.global.space.padding.l};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const FilterButton = styled.button`
  color: ${({ theme }) => theme.text.secondary};
`;

const SubHeader = ({ setShowFiltersPanel }) => {
  const openFiltersPanel = () => {
    console.log('open!');
    setShowFiltersPanel(true);
  };

  return (
    <SubHeaderWrappper>
      <FilterButton onClick={openFiltersPanel}>
        <FontAwesomeIcon
          icon={['fas', 'filter']}
        /> Filter
      </FilterButton>
    </SubHeaderWrappper>
  )
};

SubHeader.propTypes = {
  setShowFiltersPanel: PropTypes.func
};

export default SubHeader;
