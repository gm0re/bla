import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import Waveform from './Waveform';

const PlayButton = styled.button`
  padding: 0;
  background-color: transparent;
  position: relative;
}`;

const PlayButtonWrappper = styled.div`
  :hover {
    border: 2px solid #00c5ff;
  }

  border: 2px solid transparent;
  height: 48px;
  width: 48px;
  border-radius: 100%;

  ${({ playButtonFocus }) => (playButtonFocus && (
    'animation: icon-focus .4s;'
  ))}

  @keyframes icon-focus {
    0% {
      border: 2px solid #00c5ff;
    }
    100% {
      border: 2px solid transparent
    }
  }
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
}`;

const AudioTime = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
  font-weight: lighter;
  font-size: small;
}`

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 4px;
  line-height: 18px;
  align-items: flex-end;
`;

const WaveformWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  margin: 4px;
  line-height: 18px;
`;

const LeftsideHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-end;
`;

const RightsideHeader = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > span {
    margin-left: ${({ theme }) => theme.global.space.margin.l};
  }
`;

const PLAYER_STATES = {
  paused: 'paused',
  playing: 'playing'
};

const PLAYER_DURATION_LABEL = '00:00 / 00:00';

const Player = ({
  isDetailed,
  playButton,
  recording,
  title,
  theme,
  subtitle
}) => {
  const playerRef = useRef(null);
  const [audioTime, setAudioTime] = useState(PLAYER_DURATION_LABEL);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.paused);
  const [audioSamples, setAudioSamples] = useState([]);
  const [playButtonFocus, setPlayButtonFocus] = useState(false);

  let { current: player } = playerRef;

  const fixPlayerDuration = () => {
    if (player.duration !== Infinity) {
      player.currentTime = 0;
    }
  };

  // weird stuff to set audio duration on chrome
  const setPlayerDuration = () => {
    player.addEventListener('durationchange', fixPlayerDuration, false);
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

  // 👷 need to add an additional state for when the audio has reached the end
  const playAudio = e => {
    e.stopPropagation();

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

  const fetchAudioSamples = () => {
    fetch(`http://localhost:1337/${recording.filename}.json`)
      .then(recordingSamplesRaw => recordingSamplesRaw.json())
      .then(recordingSamples => {
        setAudioSamples(recordingSamples.data)
      })
      .catch(error => {
        console.error(error)
      });
  };

  const removeListenersOnUnmount = () => {
    player.removeEventListener('timeupdate', onTimeUpdate);
    player.removeEventListener('durationchange', fixPlayerDuration);
  };

  useEffect(() => {
    fetchAudioSamples();

    player = playerRef.current;

    player.addEventListener('timeupdate', onTimeUpdate);

    setPlayerDuration();

    return removeListenersOnUnmount;
  }, [playerRef, setAudioSamples]);

  const onWaveFormclick = e => {
    e.stopPropagation();
    setPlayButtonFocus(true);
  };

  const waveformColors = {
    ...theme.waveform,
    background: isDetailed
      ? theme.waveform.background
      : theme.background.secondary
  };

  return (
    <PlayerWrapper>
      <audio
        src={`http://localhost:1337/${recording.filepath}`}
        type={recording.filetype}
        ref={playerRef}
      />
      <PlayerHeader>
        <LeftsideHeader>
          <PlayButtonWrappper
            playButtonFocus={playButtonFocus}
            onAnimationEnd={() => {
              setPlayButtonFocus(false);
            }}
          >
            <PlayButton onClick={playAudio}>
              {playButton}
            </PlayButton>
          </PlayButtonWrappper>
          <TitleWrapper>
            <span>{title}</span>
            <span>{subtitle}</span>
          </TitleWrapper>
        </LeftsideHeader>
        <RightsideHeader>
          <AudioTime>{audioTime}</AudioTime>
        </RightsideHeader>
      </PlayerHeader>
      <WaveformWrapper onClick={onWaveFormclick}>
        {audioSamples.length && (
          <Waveform
            audioSamples={recording.samples?.length
              ? recording.samples
              : audioSamples}
            playerRef={playerRef}
            colors={waveformColors}
          />
        )}
      </WaveformWrapper>
    </PlayerWrapper>
  );
};

Player.propTypes = {
  isDetailed: PropTypes.bool,
  playButton: PropTypes.node,
  recording: PropTypes.shape({
    filename: PropTypes.string,
    filepath: PropTypes.string,
    filetype: PropTypes.string,
    samples: PropTypes.array
  }),
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  theme: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
};

export default withTheme(Player);
