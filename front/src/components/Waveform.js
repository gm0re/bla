import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WaveformWrapper = styled.div`
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
}`;

const PlayerCanvas = styled.canvas`
  width: 400px;
  height: 50px;
  position: absolute;
}`;

const Waveform = ({
  audioSamples,
  playerRef,
  recording
}) => {
  const canvasRef = useRef(null);
  const positionMaskRef = useRef(null);
  const progressMaskRef = useRef(null);

  let { current: canvas } = canvasRef;
  let { current: positionMask } = positionMaskRef;
  let { current: progressMask } = progressMaskRef;
  let { current: player } = playerRef;

  const drawPositionMask = x => {
    positionMask.style.width = `${x}px`;
  };

  const drawProgressMask = (x, type = 'pixels') => {
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
    ctx.strokeStyle = 'white';

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

  const onTimeUpdate = () => {
    drawProgressMask(player.currentTime / player.duration, 'percentage');
  };

  const updateCurrentTime = (x, width) => {
    const progressPositionPercentage = x / width;
    const newCurrentTime = progressPositionPercentage * player.duration;

    player.currentTime = newCurrentTime;
  };

  useEffect(() => {
    canvas = canvasRef.current;
    positionMask = positionMaskRef.current;
    progressMask = progressMaskRef.current;

    player = playerRef.current;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#232831';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.translate(0, canvas.offsetHeight / 2);
    ctx.globalCompositeOperation = 'destination-out';

    player.addEventListener('timeupdate', onTimeUpdate);

    draw(
      getFilteredSamplesByBlocks(audioSamples, canvas.width),
      canvas,
      ctx
    );

    return () => player.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <WaveformWrapper
      id={recording.id}
      onClick={({ nativeEvent: { layerX } }) => updateCurrentTime(layerX, canvas.width)}
      onMouseUp={({ nativeEvent: { layerX } }) => updateCurrentTime(layerX, canvas.width)}
      onMouseDown={({ nativeEvent: { layerX } }) => updateCurrentTime(layerX, canvas.width)}
      onMouseMove={({ nativeEvent: { layerX } }) => drawPositionMask(layerX, canvas.width)}
      onMouseOut={() => drawPositionMask(0)}
    >
      <ProgressMask ref={progressMaskRef} />
      <PositionMask ref={positionMaskRef} />
      <PlayerCanvas ref={canvasRef} />
    </WaveformWrapper>
  )
};

Waveform.propTypes = {
  audioSamples: PropTypes.array,
  playerRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLAudioElement)
  }),
  recording: PropTypes.object
};

export default Waveform;
