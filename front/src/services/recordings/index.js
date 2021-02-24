import axios from 'axios';

// 👷‍♀️ set domain and move to env vars
const DOMAIN = 'http://localhost:1337';

const recordingsSvc = {
  get: () => (
    axios
      .get(`${DOMAIN}/recordings`)
      .then(({ data: recordings }) => recordings)
      .catch(error => {
        console.error(error);
      })
  ),
  save: newRecording => (
    axios
      .post(`${DOMAIN}/recordings`, newRecording)
      .then(({ data: recording }) => recording)
      .catch(error => {
        console.error(error);
      })
  )
};

export default recordingsSvc;
