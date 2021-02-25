import React from "react";
import PropTypes from "prop-types";

import useRecorder from "../hooks/useRecorder";

import { states as recorderStates } from "../constants/recorder";

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const ActionButton = ({ children, onClick }) => (
  <div className="p-1" onClick={onClick}>
    {children}
  </div>
);

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

const Recorder = ({ setNewRecording }) => {
  const [
    pauseRecording,
    recorderState,
    resumeRecording,
    startRecording,
    stopRecording
  ] = useRecorder(setNewRecording);

  return (
    <div className="flex justify-center p-2">
      {recorderState !== "recording" && (
        <ActionButton
          onClick={recorderState === PAUSED ? resumeRecording : startRecording}
          disabled={recorderState === RECORDING || recorderState === RESUMING}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </svg>
        </ActionButton>
      )}
      {recorderState === "recording" && (
        <ActionButton
          onClick={stopRecording}
          disabled={recorderState === INACTIVE}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
              clipRule="evenodd"
            />
          </svg>
        </ActionButton>
      )}
    </div>
  );
};

Recorder.propTypes = {
  setNewRecording: PropTypes.func
};

export default Recorder;
