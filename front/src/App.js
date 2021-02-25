import * as React from "react";

import './icons';

import {
  Recorder,
  EmptyFeed,
  Header,
  Recordings
} from './components';

import useRecording from "./hooks/useRecording";

const App = () => {
  const [
    recordings,
    setNewRecording
  ] = useRecording();

  const user = {
    id: 0,
    username: 'gmore'
  };

  return (
    <div className="m-2 flex flex-col rounded-lg bg-gray-100">
      <Header user={user} />

      {(!recordings.length) && <EmptyFeed />}

      <Recordings recordings={recordings} />
      <Recorder setNewRecording={setNewRecording} />
    </div>
  );
}

export default App;
