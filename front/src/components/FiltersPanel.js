import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';

import "react-datepicker/dist/react-datepicker.css";

import Filters from './Filters';

const FiltersPanelWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  border-left: ${({ theme }) => theme.border};
  border-bottom: ${({ theme }) => theme.border};
  border-radius: 0 16px 16px 0;
  z-index: 9999;
`;

const Header = styled.div`
  border-bottom: ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.global.space.padding.xl};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseButton = styled.button``;

const FilterItem = styled.div`
  padding: ${({ theme }) => theme.global.space.padding.xl};
`;

const FiltersPanel = ({
  setShowFiltersPanel
}) => {
  // to be moved to parent with hook
  const [filters, setFilters] = useState(['holasdoiasdlkmaslkdmalksdmklamsdlkalksdmlamda']);

  const closePanel = () => {
    setShowFiltersPanel(false);
  };

  const sortingOptions = [
    {
      label: 'Newest first',
      value: 'newest'
    },
    {
      label: 'Oldest first',
      value: 'oldest'
    }
  ];

  return (
    <FiltersPanelWrapper>
      <Header>
        <label>Filters</label>
        <CloseButton onClick={closePanel}>
          <FontAwesomeIcon icon={['fa', 'times']} />
        </CloseButton>
      </Header>
      <Filters
        filters={filters}
        setFilters={setFilters}
      />
      <FilterItem>Sort by: <Dropdown options={sortingOptions} /></FilterItem>
      <FilterItem>From: <DatePicker /></FilterItem>
      <FilterItem>To: <DatePicker /></FilterItem>
    </FiltersPanelWrapper>
  );
};

FiltersPanel.propTypes = {
  setShowFiltersPanel: PropTypes.func
};

export default FiltersPanel;
