import * as React from "react";

import "./styles.css";

import useRecorder from "./useRecorder";

const App = () => {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  return (
    <div className="App">
      <audio src={audioURL} controls />
      <button onClick={startRecording} disabled={isRecording}>
        start recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button>

      <p>
        <em>
          (On Codesandbox pop out the preview into a window to get a user media
          request.)
        </em>
      </p>
    </div>
  );
}

export default App;
