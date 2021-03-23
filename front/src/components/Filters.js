import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChipsWrapper = styled.div`
  padding: ${({ theme }) => theme.global.space.padding.l};
`;

const Chip = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: ${({ theme }) => theme.global.space.padding.m};
  margin: ${({ theme }) => theme.global.space.margin.m};
  border-radius: 16px;
  align-items: center;
  border: ${({ theme }) => theme.border};
  max-width: 150px;
`;

const Label = styled.div`
  max-width: 110px;
  min-width: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const RemoveChipButton = styled.button`
  border-radius: 100%;
  height: 20px;
  width: 20px;
  margin: 0 4px 0 4px;
`;

const Filters = ({
  filters,
  setFilters
}) => {
  const removeFilter = filterToRemove => {
    const newFilters = filters.filter(filter => filter !== filterToRemove);

    setFilters([
      ...filters,
      newFilters
    ]);
  };

  return (
    <ChipsWrapper>
      {!!filters.length && filters.map((filter, key) => (
        <Chip filter={filter} key={`chip-${key}`}>
          <Label>{filter}</Label>
          <RemoveChipButton onClick={() => removeFilter(filter) }>
            <FontAwesomeIcon icon={['fa', 'times']} />
          </RemoveChipButton>
        </Chip>
      ))}
    </ChipsWrapper>
  );
};

Filters.propTypes = {
  filters: PropTypes.array,
  setFilters: PropTypes.func
};

export default Filters;
