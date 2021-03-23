import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';

import "react-datepicker/dist/react-datepicker.css";

import Filters from './Filters';

const FiltersPanelWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000047;
  width: 100%;
  height: 100%;
  z-index: 9998;
  border-radius: 16px;
`;

const SideBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  border-left: ${({ theme }) => theme.border};
  border-bottom: ${({ theme }) => theme.border};
  border-radius: 0 16px 16px 0;
  z-index: 9999;

  ${({ showFiltersPanel }) => (showFiltersPanel && (
    'animation: open-sidebar .5s;'
  ))}

  @keyframes open-sidebar {
    0% {
      width: 0;
    }
    100% {
      width: 62%;
    }
  }
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
  setShowFiltersPanel,
  showFiltersPanel
}) => {
  // to be moved to parent with hook
  const [filters, setFilters] = useState([]);

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

  const addFilter = filter => {
    setFilters([
      ...filters,
      filter
    ]);
    console.log('filter', filters, filter);
  };

  return (
    <FiltersPanelWrapper>
      <Backdrop onClick={closePanel} />
      <SideBar showFiltersPanel={showFiltersPanel}>
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
        <FilterItem>
          Sort by:
          <Dropdown
            options={sortingOptions}
            placeholder={"Select..."}
            onChange={sorting => addFilter(Object.values(sorting))}
          />
        </FilterItem>
        <FilterItem>
          From:
          <DatePicker onChange={fromDate => addFilter(fromDate.toString())} />
        </FilterItem>
        <FilterItem>
          To:
          <DatePicker onChange={toDate => addFilter(toDate.toString())} />
        </FilterItem>
      </SideBar>
    </FiltersPanelWrapper>
  );
};

FiltersPanel.propTypes = {
  setShowFiltersPanel: PropTypes.func,
  showFiltersPanel: PropTypes.bool
};

export default FiltersPanel;
