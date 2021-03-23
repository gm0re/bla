import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const FiltersPanel = ({
  setShowFiltersPanel
}) => {
  const closePanel = () => {
    setShowFiltersPanel(false);
  };

  return (
    <FiltersPanelWrapper>
      <Header>
        <label>Filters</label>
        <CloseButton onClick={closePanel}>
          <FontAwesomeIcon icon={['fa', 'times']} />
        </CloseButton>
      </Header>
    </FiltersPanelWrapper>
  );
};

FiltersPanel.propTypes = {
  setShowFiltersPanel: PropTypes.func
};

export default FiltersPanel;
