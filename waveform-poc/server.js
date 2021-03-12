const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const engine = require('consolidate');

const app = express();

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', (_, res) => {
  fs.readFile('./public/sktwi1e0bkm16faiz.webm', (err, file) => {
    if (err) throw new Error(err);

    const { data: audioSamples } = file.toJSON();

    fs.writeFile('./file.json', JSON.stringify(file.toJSON()), (err) => {
      if (err) throw new Error(err);
      console.log(`The file has been saved! File data buffer: ${file.toJSON().data.length}`);

      const data = {
        name: 'gmore',
        audioUrl: 'http://localhost:8080/sktwi1e0bkm16faiz.webm',
        audioSamples: audioSamples
      };

      res.render(path.join('index.html'), data, (err, html) => {
        if (err) throw new Error(err);

        res.send(html);
      });
    });
  });
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Listening on port 8080');
});