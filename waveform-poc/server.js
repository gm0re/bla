const http = require('http');
const fs = require('fs');

function handleRequests(req, res) {

  fs.readFile('./sktwi1e0bkm16faiz.webm', (err, file) => {
    if (err) throw new err;
    console.log(file.toJSON());
  });

  res.end('Hello gato pato rata!');
};

const server = http.createServer(handleRequests);

server.listen(8080, () => {
  console.log('Listening on port 8080');
});