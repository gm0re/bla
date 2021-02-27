import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Label = styled.div`
  margin: 4px;
  font-weight: lighter;
  font-size: small;
`;

const Human = ({ timestamp }) => {
  const options = {
    day: 'numeric',
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
    month: 'short',
    timezone: new Date().getTimezoneOffset(),
    year: 'numeric'
  };
  return new Date(timestamp).toLocaleString(undefined, options);
};

const Relative = ({ timestamp }) => (
  dayjs().to(dayjs(timestamp))
);

const Timestamp = ({ human, children: timestamp, relative }) => (
  <Label>
    {human && <Human timestamp={timestamp} />}
    {relative && <Relative timestamp={timestamp} />}
  </Label>
);

Timestamp.propTypes = {
  children: PropTypes.node,
  human: PropTypes.bool,
  relative: PropTypes.bool
};

export default Timestamp;
