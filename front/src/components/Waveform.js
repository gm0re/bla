import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WAVEFORM_MIN_WIDTH = 250;
const WAVEFORM_MAX_WIDTH = 400;

const WaveformWrapper = styled.div`
  background-color: ${({ colors }) => colors.wave};
  min-width: ${WAVEFORM_MIN_WIDTH}px;
  max-width: ${WAVEFORM_MAX_WIDTH}px;
  height: 70px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}`;

const ProgressMask = styled.div`
  background-color: ${({ colors }) => colors.progress};
  width: 0px;
  height: 70px;
  position: absolute;
  transition: .2s linear;
}`;

const PositionMask = styled.div`
  background-color: ${({ colors }) => colors.position};
  width: 0px;
  height: 70px;
  position: absolute;
}`;

const PlayerCanvas = styled.canvas`
  min-width: ${WAVEFORM_MIN_WIDTH}px;
  max-width: ${WAVEFORM_MAX_WIDTH}px;
  height: 70px;
  position: absolute;
  align-self: center;
}`;

const Waveform = ({
  audioSamples,
  colors,
  playerRef
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
    ctx.strokeStyle = colors.wave;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + (spaceBetween / 2), y, spaceBetween / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + spaceBetween, 0);
    ctx.stroke();
  };

  const draw = (audioWaves, { height: canvasHeight, offsetWidth: canvasWidth }, ctx) => {
    const waveWidth = canvasWidth / audioWaves.length;
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

  const getFilteredSamplesByBlocks = () => {
    const wavesDistance = 5;
    const samples = Math.floor(canvas.width / wavesDistance);
    const blockSize = Math.floor(audioSamples.length / samples);
    const filteredAudioBuffer = [];

    for (let i = 0; i < audioSamples.length; i = i + blockSize) {
      filteredAudioBuffer.push(audioSamples[i]);
    }

    return filteredAudioBuffer;
  };

  const onTimeUpdate = () => {
    drawProgressMask(player.currentTime / player.duration, 'percentage');
  };

  const updateCurrentTime = x => {
    const progressPositionPercentage = x / canvas.width;
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

    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.translate(0, canvas.offsetHeight / 2);
    ctx.globalCompositeOperation = 'destination-out';

    player.addEventListener('timeupdate', onTimeUpdate);

    draw(
      getFilteredSamplesByBlocks(),
      canvas,
      ctx
    );

    return () => player.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <WaveformWrapper
      onClick={({ nativeEvent: { layerX } }) => updateCurrentTime(layerX)}
      onMouseUp={({ nativeEvent: { layerX } }) => updateCurrentTime(layerX)}
      onMouseDown={({ nativeEvent: { layerX } }) => updateCurrentTime(layerX)}
      onMouseMove={({ nativeEvent: { layerX } }) => drawPositionMask(layerX)}
      onMouseOut={() => drawPositionMask(0)}
      colors={colors}
    >
      <ProgressMask ref={progressMaskRef} colors={colors} />
      <PositionMask ref={positionMaskRef} colors={colors} />
      <PlayerCanvas ref={canvasRef} />
    </WaveformWrapper>
  )
};

Waveform.propTypes = {
  audioSamples: PropTypes.arrayOf(PropTypes.number),
  colors: PropTypes.shape({
    background: PropTypes.string,
    position: PropTypes.string,
    progress: PropTypes.string,
    wave: PropTypes.string
  }),
  playerRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLAudioElement)
  })
};

export default Waveform;
