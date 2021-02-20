import axios from 'axios';

const recordingsSvc = {
  get: () => (
    axios
      .get('http://localhost:1337/recordings')
      .then(({ data: recordings }) => recordings)
      .catch(error => {
        console.error(error);
      })
  )
};

export default recordingsSvc;
