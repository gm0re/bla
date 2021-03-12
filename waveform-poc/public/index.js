((() => {
  const audioSamplesRaw = document.getElementById("audioSamples").innerHTML;
  const audioSamples = audioSamplesRaw.split(',');
  const canvasContainer = document.getElementById('canvas-container');
  const positionMask = document.getElementById('position-mask');
  const progressMask = document.getElementById('background');

  // weird stuff to get audio duration on chrome
  const getAudioMetadata = (player, next) => {
    player.addEventListener('durationchange', () => {
      if (player.duration !== Infinity) {
        player.currentTime = 0;
        next({ player });
      };
    }, false);

    player.currentTime = 24 * 60 * 60; // fake big time
  };

  const drawPositionMask = (x) => {
    positionMask.style.width = `${x}px`;
  };

  const drawProgressMask = (x) => {
    progressMask.style.width = `${x * 100}%`;
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

  const drawLineSegment = (ctx, x, y, spaceBetween, isEven) => {
    y = isEven ? y : -y;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + spaceBetween / 2, y, spaceBetween / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + spaceBetween, 0);
    ctx.stroke();
  };

  const draw = (audioSamples, { height: canvasHeight }, ctx) => {
    const waveWidth = canvas.offsetWidth / audioSamples.length;
    const maxSampleRate = 255;

    for (let i = 0; i < audioSamples.length; i++) {
      const waveHorizontalPosition = waveWidth * i;
      const isEven = (i + 1) % 2;

      let waveHeight = (audioSamples[i] * canvasHeight) / (maxSampleRate * 2);

      if (waveHeight >= canvasHeight / 2.5) {
        waveHeight = (canvasHeight / 2) - 5;
      }
      drawLineSegment(ctx, waveHorizontalPosition, waveHeight, waveWidth, isEven);
    }
  };

  const getFormattedTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const minutesLabel = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsLabel = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutesLabel}:${secondsLabel}`;
  }

  const player = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  const audioTime = document.getElementById('audio-time');

  let playState = 'pause';

  playBtn.onclick = () => {
    playBtn.textContent = playState;

    if (playState.toLowerCase() === 'play') {
      player.pause();
      playState = 'pause';
    } else {
      player.play();
      playState = 'play';
    }
  }

  player.addEventListener('timeupdate', () => {
    audioTime.innerHTML = `${getFormattedTime(player.currentTime)} / ${getFormattedTime(player.duration)}`;
    drawProgressMask(player.currentTime / player.duration);
  });

  const canvas = document.querySelector("canvas");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  canvasContainer.onmousemove = ({ layerX }) => {
    drawPositionMask(layerX);
  };

  canvasContainer.onmouseout = () => {
    drawPositionMask(0);
  };

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#232831";
  ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  ctx.translate(0, canvas.offsetHeight / 2);
  ctx.globalCompositeOperation = "destination-out";

  getAudioMetadata(player, (audioMetaData) => {
    console.log(audioMetaData);
  });

  draw(
    getFilteredSamplesByBlocks(audioSamples, canvas.width),
    canvas,
    ctx
  );
})());
