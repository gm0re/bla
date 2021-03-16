import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GoBackIcon = styled(FontAwesomeIcon)`
  height: 19px;
`;

const GoBackButton = styled.button`
  &:hover  {
    border: ${({ theme }) => theme.global.button.borderRadius};
    background-color: ${({ theme }) => theme.button.hover};
  }
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
