import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'react-toggle/style.css';

const SettingsWrapper = styled.div`
  min-height: 600px;
  padding: ${({ theme }) => theme.global.space.padding.xxl};
`;

const SettingItem = styled.div`
  :hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
  padding: ${({ theme }) => theme.global.space.padding.l};
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: ${({ theme }) => theme.border};
`;

const SettingName = styled.label``;

const ThemeIcon = styled(FontAwesomeIcon)`
  height: 12px;
  width: 12px;
`;

const LightIcon = () => (
  <ThemeIcon
    icon={['fas', 'sun']}
    color="yellow"
  />
);

const DarkIcon = () => (
  <ThemeIcon
    icon={['fas', 'moon']}
    color="yellow"
  />
);

// 🔨 review colors
const ThemeToggle = styled(Toggle).attrs(() => ({ className: 'foo' }))`
  &.foo.react-toggle--checked .react-toggle-track {
    background-color: #2aa6ff;
  }
  > .react-toggle-track {
    background-color: #200080;
  }
`;

const Settings = ({
  theme,
  themeTypes,
  setDark,
  setLight
}) => {
  const onToggleClick = () => {
    if (theme.type === themeTypes.LIGHT) {
      setDark();
    } else {
      setLight();
    }
  };

  return (
    <SettingsWrapper>
      <SettingItem>
        <SettingName>Theme Mode</SettingName>
        <ThemeToggle
          icons={{
            checked: <LightIcon />,
            unchecked: <DarkIcon />
          }}
          onChange={onToggleClick}
        />
      </SettingItem>
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  setDark: PropTypes.func,
  setLight: PropTypes.func,
  theme: PropTypes.object,
  themeTypes: PropTypes.object
};

export default Settings;
