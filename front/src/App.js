import * as React from "react";
import styled from 'styled-components';

import './icons';

import {
  Recorder,
  EmptyFeed,
  Header,
  Recordings
} from './components';

import useRecording from "./hooks/useRecording";

const GlobalWrapper = styled.div`
  font-family: sans-serif;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #fdfafa;
`;

const App = () => {
  const [
    recordings,
    setNewRecording
  ] = useRecording();

  // 👩‍🏭 hardcoded user until log in is implemented
  const user = {
    id: 1,
    profilePic: 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAABJ0RVh0U29mdHdhcmUASmRlbnRpY29um8oJfgAAAC1QTFRFAAAA6Ojo6OjoVFRU6OjoVFRUwHXRwHXRwHXRVFRUwHXRwHXRwHXRwHXRwHXR+C2ZeQAAAA90Uk5TAP+/fz///z+/jHJ/RsWMqHD4xAAAAR1JREFUeJzdlVsWwyAIRA0hiX3uf7m1PhAQY9J+tfxE7dwjMFad+5OYQgDN5lmOEKYcAkBSLcusRgXhADB91tVRQTiAXB91dUQIA0Dqg66OHCEMwAMA7xJrUS8lCaCTRFO0CuATo61NoJhp4zqRflyNsNG8fQdokysF2kBbPrXQBNoGV5Pegi2sbFHq4+fSWigBH1Z8lKcUDUCltMUNrqVrpueiaB83oB1sz0Vbb7ncVIPZ1vPGfeP0/bGKzIZOBxc8q33s9HvhSd094HTeofg3djolVE/I2Onx4Tt/vM//gT5wWqOGDBspT85IBCz5zkWGU1dvX5VgATuXMbLrHvAAoN6H8YOi37iC9IoGDRBitxWbV7QipnHyUfzxeAFuLRHx5FWwgAAAAABJRU5ErkJggg==',
    username: 'gmore'
  };

  return (
    <GlobalWrapper>
      <Header user={user} />

      {(!recordings.length) && <EmptyFeed />}

      <Recordings recordings={recordings} />
      <Recorder setNewRecording={setNewRecording} />
    </GlobalWrapper>
  );
}

export default App;
