import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const inactiveColor = 'grey';

const ActionButtonGlow = styled.div`
  display: none;
  position: absolute;
  border-radius: 100%;
  opacity: 20%;
  background-color: ${({ color }) => color};
  width: ${({ theme }) => theme.global.icon.size.s};
  height: ${({ theme }) => theme.global.icon.size.s};
`;

const ActionButtonElems = styled.div`
  position: relative;
  width: ${({ theme }) => theme.global.icon.size.s};
  height: ${({ theme }) => theme.global.icon.size.s};
`;

const ActionIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 3px;
  left: 4px;
  width: 16px !important;
  height: 19px;
  display: block;
`;

const Counter = styled.span`
  color: ${({ color }) => color};
`;

const RecordingActionButton = styled.button`
  &:hover ${ActionButtonGlow} {
    display: block;
  }

  &:hover ${ActionIcon} {
    color: ${({ color }) => color};
  }

  &:hover ${Counter} {
    color: ${({ color }) => color};
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;

  > div {
    margin: ${({ theme }) => theme.global.space.margin.m};
  }
`;

const RecordingAction = ({
  color,
  count,
  icon,
  isActive,
  onClick
}) => {
  const onClickWrapper = (event, next) => {
    event.stopPropagation();
    next();
  };

  return (
    <RecordingActionButton
      color={color}
      onClick={event => onClickWrapper(event, onClick)}
    >
      {typeof count === 'number' && (
        <Counter color={inactiveColor}>{`${count}`}</Counter>
      )}
      <ActionButtonElems>
        <ActionIcon
          icon={icon}
          color={isActive ? color : inactiveColor}
        />
        <ActionButtonGlow color={color} />
      </ActionButtonElems>
    </RecordingActionButton>
  );
};

RecordingAction.propTypes = {
  color: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.arrayOf(PropTypes.string),
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default RecordingAction;
