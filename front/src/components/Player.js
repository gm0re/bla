import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import audioSamplesJson from '../mocks/audioSamples.json';

const CanvasContainer = styled.div`
  width: 400px;
  height: 50px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}`;

const ProgressMask = styled.div`
  background-color: orange;
  width: 0px;
  height: 50px;
  position: absolute;
}`;

const PositionMask = styled.div`
  background-color: #00000026;
  width: 0px;
  height: 50px;
  position: absolute;
  z-index: 999;
}`;

const PlayerCanvas = styled.canvas`
  width: 400px;
  height: 50px;
  position: absolute;
}`;

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

const Player = ({
  header,
  playButton,
  recording
}) => {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const positionMaskRef = useRef(null);
  const progressMaskRef = useRef(null);
  const [audioTime, setAudioTime] = useState('00:00 / 00:00');
  const [playerState, setPlayerState] = useState(PLAYER_STATES.paused);

  // weird stuff to load json > first stringify
  const audioSamples = JSON.parse(JSON.stringify(audioSamplesJson)).data;

  // weird stuff to get audio duration on chrome
  const getPlayerStats = (player, next) => {
    console.log(player);
    player.addEventListener('durationchange', () => {
      if (player.duration !== Infinity) {
        player.currentTime = 0;
        return next({ player });
      }
    }, false);
    // fake big time
    player.currentTime = 24 * 60 * 60;
  };

  const getFilteredSamplesByBlocks = (audioBuffer, totalWidth) => {
    const wavesDistance = 5;
    const samples = Math.floor(totalWidth / wavesDistance);
    const blockSize = Math.floor(audioBuffer.length / samples);
    const filteredAudioBuffer = [];

    for (let i = 0; i < audioBuffer.length; i = i + blockSize) {
      filteredAudioBuffer.push(audioBuffer[i]);
    }

    return filteredAudioBuffer;
  };

  const getFormattedTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const minutesLabel = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsLabel = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutesLabel}:${secondsLabel}`;
  }

  const updateCurrentTime = (canvas, player, x) => {
    const progressPositionPercentage = x / canvas.width;
    const newCurrentTime = progressPositionPercentage * player.duration;

    player.currentTime = newCurrentTime;
  };

  const playAudio = player => {
    if (playerState === PLAYER_STATES.playing) {
      player.pause();
      setPlayerState(PLAYER_STATES.paused);
      // Show pause btn
    } else {
      player.play();
      setPlayerState(PLAYER_STATES.playing);
      // Show play btn
    }
    // console.log(player.)
  };

  const drawPositionMask = (positionMask, x) => {
    positionMask.style.width = `${x}px`;
  };

  const drawProgressMask = (progressMask, x, type = 'pixels') => {
    const types = {
      percentage: '%',
      pixels: 'px'
    };
    const formatWidth = () => `${types[type] === 'px' ? x : x * 100}${types[type]}`;

    progressMask.style.width = formatWidth(type);
  };

  const drawLineSegment = (ctx, x, absY, spaceBetween, isEven) => {
    const y = isEven ? absY : -absY;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + (spaceBetween / 2), y, spaceBetween / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + spaceBetween, 0);
    ctx.stroke();
  };

  const draw = (audioWaves, { height: canvasHeight, offsetWidth }, ctx) => {
    const waveWidth = offsetWidth / audioWaves.length;
    const maxSampleRate = 255;

    for (let i = 0; i < audioWaves.length; i++) {
      const waveHorizontalPosition = waveWidth * i;
      const isEven = (i + 1) % 2;

      let waveHeight = (audioWaves[i] * canvasHeight) / (maxSampleRate * 2);

      if (waveHeight >= canvasHeight / 2.5) {
        waveHeight = (canvasHeight / 2) - 5;
      }
      drawLineSegment(ctx, waveHorizontalPosition, waveHeight, waveWidth, isEven);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const player = playerRef.current;
    const positionMask = positionMaskRef.current;
    const progressMask = progressMaskRef.current;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#232831";
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.translate(0, canvas.offsetHeight / 2);
    ctx.globalCompositeOperation = "destination-out";

    player.addEventListener('timeupdate', () => {
      const newAudioTime = `${getFormattedTime(player.currentTime)} / ${getFormattedTime(player.duration)}`;
      setAudioTime(newAudioTime);
      drawProgressMask(progressMask, player.currentTime / player.duration, 'percentage');
    });

    getPlayerStats(player, audioMetaData => {
      console.log(audioMetaData);
    });

    draw(
      getFilteredSamplesByBlocks(audioSamples, canvas.width),
      canvas,
      ctx
    );
  }, []);

  return (
    <PlayerWrapper onClick={e => e.stopPropagation()}>
      <audio
        src={`http://localhost:1337/${recording.filepath}`}
        type={recording.filetype}
        ref={playerRef}
      />
      <PlayerHeader>
        {header}
        <AudioTime>{audioTime}</AudioTime>
      </PlayerHeader>
      <PlayerContent>
        <PlayButtonWrappper>
          <PlayButton onClick={() => playAudio(playerRef.current)}>{playButton}</PlayButton>
        </PlayButtonWrappper>
        <CanvasContainer
          id={recording.id || recording.filename}
          onClick={e => updateCurrentTime(canvasRef.current, playerRef.current, e.nativeEvent.layerX)}
          onMouseUp={e => updateCurrentTime(canvasRef.current, playerRef.current, e.nativeEvent.layerX)}
          onMouseDown={e => updateCurrentTime(canvasRef.current, playerRef.current, e.nativeEvent.layerX)}
          onMouseMove={e => drawPositionMask(positionMaskRef.current, e.nativeEvent.layerX)}
          onMouseOut={() => drawPositionMask(positionMaskRef.current, 0)}
        >
          <ProgressMask ref={progressMaskRef} />
          <PositionMask ref={positionMaskRef} />
          <PlayerCanvas ref={canvasRef} />
        </CanvasContainer>
      </PlayerContent>
    </PlayerWrapper>
  );
};

Player.propTypes = {
  header: PropTypes.node,
  playButton: PropTypes.node,
  recording: PropTypes.shape({
    filename: PropTypes.string,
    filepath: PropTypes.string,
    filetype: PropTypes.string,
    id: PropTypes.number,
    src: PropTypes.string,
    type: PropTypes.string
  })
};

export default Player;
