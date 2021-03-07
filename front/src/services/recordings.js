import axios from 'axios';

// 👷‍♀️ set domain and move to env vars
const DOMAIN = 'http://localhost:1337';

const recordingsSvc = {
  deleteFav: ({ recordingId, userId }) => (
    axios
      .delete(`${DOMAIN}/favs/recording/${recordingId}/user/${userId}`)
      .then(({ data: fav }) => fav)
      .catch(error => {
        console.error(error);
      })
  ),
  deleteReply: ({ recordingId, userId }) => (
    axios
      .delete(`${DOMAIN}/replies/recording/${recordingId}/user/${userId}`)
      .then(({ data: reply }) => reply)
      .catch(error => {
        console.error(error);
      })
  ),
  deleteShare: ({ recordingId, userId }) => (
    axios
      .delete(`${DOMAIN}/shares/recording/${recordingId}/user/${userId}`)
      .then(({ data: share }) => share)
      .catch(error => {
        console.error(error);
      })
  ),
  deleteStar: ({ recordingId, userId }) => (
    axios
      .delete(`${DOMAIN}/stars/recording/${recordingId}/user/${userId}`)
      .then(({ data: stars }) => stars)
      .catch(error => {
        console.error(error);
      })
  ),
  get: (
    limit,
    skip,
    where = '',
    sorting = {
      order: 'DESC',
      sort: 'createdAt'
    }
  ) => (
    axios
      .get(`${DOMAIN}/recordings?${where && `where=${JSON.stringify(where)}`}&limit=${limit}&skip=${skip}&sort=${sorting.sort} ${sorting.order}`)
      .then(({ data: recordings }) => recordings)
      .catch(error => {
        console.error(error);
      })
  ),
  save: (newRecording, userId, parentRecId = '') => (
    axios
      .post(`${DOMAIN}/recordings/user/${userId}/parent/${parentRecId}`, newRecording, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data: recording }) => recording)
      .catch(error => {
        console.error(error);
      })
  ),
  saveFav: newFav => (
    axios
      .post(`${DOMAIN}/favs`, newFav)
      .then(({ data: fav }) => fav)
      .catch(error => {
        console.error(error);
      })
  ),
  saveReply: newReply => (
    axios
      .post(`${DOMAIN}/replies`, newReply)
      .then(({ data: star }) => star)
      .catch(error => {
        console.error(error);
      })
  ),
  saveShare: newShare => (
    axios
      .post(`${DOMAIN}/shares`, newShare)
      .then(({ data: share }) => share)
      .catch(error => {
        console.error(error);
      })
  ),
  saveStar: newStar => (
    axios
      .post(`${DOMAIN}/stars`, newStar)
      .then(({ data: star }) => star)
      .catch(error => {
        console.error(error);
      })
  )
};

export default recordingsSvc;
