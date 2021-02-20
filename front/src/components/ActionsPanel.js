import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { states as recorderStates } from '../constants/recorder';

const { PAUSED, RECORDING, INACTIVE } = recorderStates;

const RecorderActionsPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px;
`;

const RecorderActionButton = styled.button`
  margin: 4px;
`;

const RecorderActionsPanel = ({
  pauseRecording,
  recorderState,
  resumeRecording,
  startRecording,
  stopRecording
}) => (
  <RecorderActionsPanelWrapper>
    <RecorderActionButton
      onClick={recorderState === PAUSED
        ? resumeRecording
        : startRecording
      }
      disabled={recorderState === RECORDING}
    >
      <FontAwesomeIcon
        icon={'microphone'}
      />
    </RecorderActionButton>
    <RecorderActionButton
      onClick={pauseRecording}
      disabled={
        recorderState === PAUSED ||
        recorderState === INACTIVE
      }
    >
      <FontAwesomeIcon
        icon={'pause'}
      />
    </RecorderActionButton>
    <RecorderActionButton
      onClick={stopRecording}
      disabled={recorderState === INACTIVE}
    >
      <FontAwesomeIcon
        icon={'stop'}
      />
    </RecorderActionButton>
  </RecorderActionsPanelWrapper>
);

RecorderActionsPanel.propTypes = {
  pauseRecording: PropTypes.func,
  recorderState: PropTypes.string,
  resumeRecording: PropTypes.func,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func
};

export default RecorderActionsPanel;
