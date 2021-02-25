import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UsernameWrapper = styled.div`
  margin: 4px;
  font-weight: bold;
`;

const Username = ({ children }) => (
  <UsernameWrapper>
    {children}
  </UsernameWrapper>
);

Username.propTypes = {
  children: PropTypes.node.isRequired
};

export default Username;
