const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const engine = require('consolidate');

const app = express();

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.get('/', (_, res) => {
  fs.readFile('./sktwi1e0bkm16faiz.webm', (err, file) => {
    if (err) throw new err;

    const { data: audioSamples } = file.toJSON();

    fs.writeFile('./file.json', JSON.stringify(file.toJSON()), (err) => {
      if (err) throw err;
      console.log(`The file has been saved! File data buffer: ${file.toJSON().data.length}`);

      const data = {
        name: 'gmore',
        audioSamples: audioSamples
      };

      res.render(path.join('index.html'), data, (err, html) => {
        if (err) throw new err;

        res.send(html);
      });
    });
  });
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Listening on port 8080');
});