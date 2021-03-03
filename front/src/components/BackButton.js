import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components';

const GoBackIcon = styled(FontAwesomeIcon)`
  height: 19px;
`;

const BackButton = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };

  return (
    <button onClick={goBack}>
      <GoBackIcon icon={['fas', 'chevron-left']} />
    </button>
  )
};

BackButton.propTypes = {
  history: PropTypes.object
}

export default BackButton;
