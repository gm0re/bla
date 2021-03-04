import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components';

const GoBackIcon = styled(FontAwesomeIcon)`
  height: 19px;
`;

const GoBackButton = styled.button`
  &:hover  {
    border: 1px black solid;
    border-radius: 10%;
    background-color: #f1f1f1;
  }
  margin: 4px;
  outline: none;
  border: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const BackButton = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };

  return (
    <GoBackButton onClick={goBack}>
      <GoBackIcon icon={['fas', 'chevron-left']} />
    </GoBackButton>
  )
};

BackButton.propTypes = {
  history: PropTypes.object
}

export default BackButton;
