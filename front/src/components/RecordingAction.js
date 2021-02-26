import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const inactiveColor = 'grey';

const ActionButtonGlow = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ color }) => color};
  border-radius: 100%;
  width: 24px;
  height: 24px;
  opacity: 20%;
`;

const ActionButtonElems = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

const ActionIcon = styled(FontAwesomeIcon)`
  position: absolute;
  width: 16px !important;
  height: 19px;
  display: block;
  top: 3px;
  left: 4px;
`;

const Counter = styled.span``;

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

  margin: 4px;
  display: flex;
  outline: none;
  border: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  flex-direction: row;
  align-items: center;

  > div {
    margin: 4px;
  }
`;

const RecordingAction = ({
  color,
  count,
  hasClickedOn,
  icon,
  onClick
}) => (
  <RecordingActionButton color={color} onClick={onClick}>
    {typeof count === 'number' && (
      <Counter color={color}>{`${count}`}</Counter>
    )}
    <ActionButtonElems>
      {hasClickedOn ? (
        <ActionIcon
          icon={icon.active}
          color={color}
        />
      ) : (
        <ActionIcon
          icon={icon.inactive}
          color={`${hasClickedOn ? color : inactiveColor}`}
        />
      )}
      <ActionButtonGlow color={color} />
    </ActionButtonElems>
  </RecordingActionButton>
);

RecordingAction.propTypes = {
  color: PropTypes.string,
  count: PropTypes.number,
  hasClickedOn: PropTypes.bool,
  icon: PropTypes.shape({
    active: PropTypes.arrayOf(PropTypes.string),
    inactive: PropTypes.arrayOf(PropTypes.string)
  }),
  onClick: PropTypes.func
};

export default RecordingAction;
