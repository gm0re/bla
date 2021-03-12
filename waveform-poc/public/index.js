((() => {
  const audioSamplesRaw = document.getElementById("audioSamples").innerHTML;
  const audioSamples = audioSamplesRaw.split(',');
  // const audioSamplesChunk = audioSamples.slice(0, 300);
  const player = document.getElementById('audio');
  const canvasContainer = document.getElementById('canvas-container');
  const positionMask = document.getElementById('position-mask');
  const progressMask = document.getElementById('background');

  let audioProgress = 0;
  let intervalId = 0;
  let progressPxls = 0;
  let positionPxls = 0;

  // weird stuff to get audio duration on Chrome
  const getAudioMetadata = (player, next) => {
    player.addEventListener('durationchange', (e) => {
      if (player.duration !== Infinity) {
        player.currentTime = 0;
        next({ player });
      };
    }, false);

    player.currentTime = 24*60*60; //fake big time
  };

  getAudioMetadata(player, (audioMetaData) => {
    console.log(audioMetaData);
  });

  player.addEventListener('timeupdate', (e) => {
    audioProgress = player.currentTime / player.duration;

    progressPxls = audioProgress;

    drawProgressMask(progressPxls);
  });

  const canvas = document.querySelector("canvas");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#232831";
  ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  ctx.translate(0, canvas.offsetHeight / 2);
  ctx.globalCompositeOperation = "destination-out";

  const drawPositionMask = (x) => {
    positionPxls = x;
    positionMask.style.width = `${positionPxls}px`;
  };

  const drawProgressMask = (x) => {
    progressMask.style.width = `${x * 100}%`;
  };

  canvasContainer.onmousemove = (e) => {
    drawPositionMask(e.layerX);
  };

  canvasContainer.onmouseout = () => {
    drawPositionMask(0);
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

  const filteredAudioSamples = getFilteredSamplesByBlocks(audioSamples, canvas.width);

  draw(filteredAudioSamples, canvas, ctx);
})());
