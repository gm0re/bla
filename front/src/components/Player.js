import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Waveform from './Waveform';

import audioSamplesJson from '../mocks/audioSamples.json';

const PlayButtonWrappper = styled.div`
  :hover {
    background-color: #00000038;
  }

  height: 48px;
  width: 48px;
  border-radius: 100%;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
}`;

const PlayButton = styled.button`
  width: 48px;
  height: 48px;
  outline: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
}`;

const AudioTime = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
}`

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 4px;
  line-height: 18px;
`;

const PlayerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  margin: 4px;
  line-height: 18px;
`;

const PLAYER_STATES = {
  paused: 'paused',
  playing: 'playing'
};

const PLAYER_DURATION_LABEL = '00:00 / 00:00';

const Player = ({
  header,
  playButton,
  recording
}) => {
  const playerRef = useRef(null);
  const [audioTime, setAudioTime] = useState(PLAYER_DURATION_LABEL);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.paused);

  let { current: player } = playerRef;

  // weird stuff to load json > first stringify
  const audioSamples = JSON.parse(JSON.stringify(audioSamplesJson)).data;

  // weird stuff to get audio duration on chrome
  const getPlayerStats = next => {
    player.addEventListener('durationchange', () => {
      if (player.duration !== Infinity) {
        player.currentTime = 0;
        return next({ player });
      }
    }, false);
    // fake big time
    player.currentTime = 24 * 60 * 60;
  };

  const getFormattedTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const minutesLabel = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsLabel = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutesLabel}:${secondsLabel}`;
  };

  const playAudio = () => {
    if (playerState === PLAYER_STATES.playing) {
      player.pause();
      setPlayerState(PLAYER_STATES.paused);
      // Show pause btn
    } else {
      player.play();
      setPlayerState(PLAYER_STATES.playing);
      // Show play btn
    }
  };

  const onTimeUpdate = () => {
    setAudioTime(`${getFormattedTime(player.currentTime)} / ${getFormattedTime(player.duration)}`);
  };

  useEffect(() => {
    player = playerRef.current;

    player.addEventListener('timeupdate', onTimeUpdate);

    getPlayerStats(audioMetaData => {
      console.log(audioMetaData);
    });

    return () => player.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <PlayerWrapper>
      <audio
        src={`http://localhost:1337/${recording.filepath}`}
        type={recording.filetype}
        ref={playerRef}
      />
      <PlayerHeader>
        {header}
        <AudioTime>{audioTime}</AudioTime>
      </PlayerHeader>
      <PlayerContent onClick={e => e.stopPropagation()}>
        <PlayButtonWrappper>
          <PlayButton onClick={playAudio}>{playButton}</PlayButton>
        </PlayButtonWrappper>
        <Waveform
          audioSamples={audioSamples}
          playerRef={playerRef}
        />
      </PlayerContent>
    </PlayerWrapper>
  );
};

Player.propTypes = {
  header: PropTypes.node,
  playButton: PropTypes.node,
  recording: PropTypes.shape({
    filepath: PropTypes.string,
    filetype: PropTypes.string
  })
};

export default Player;
