import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { states as recorderStates } from '../constants/recorder';

const { PAUSED, RECORDING, INACTIVE } = recorderStates;

const RecorderActionsPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px;
`;

const ActionsPanel = ({
  pauseRecording,
  recorderState,
  resumeRecording,
  startRecording,
  stopRecording
}) => (
  <RecorderActionsPanel>
    <button
      onClick={recorderState === PAUSED
        ? resumeRecording
        : startRecording
      }
      disabled={recorderState === RECORDING}
    >
      Record
    </button>
    <button
      onClick={pauseRecording}
      disabled={
        recorderState === PAUSED ||
        recorderState === INACTIVE
      }
    >
      Pause
    </button>
    <button
      onClick={stopRecording}
      disabled={recorderState === INACTIVE}
    >
      Stop
    </button>
  </RecorderActionsPanel>
);

ActionsPanel.propTypes = {
  pauseRecording: PropTypes.func,
  recorderState: PropTypes.string,
  resumeRecording: PropTypes.func,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func
};

export default ActionsPanel;
