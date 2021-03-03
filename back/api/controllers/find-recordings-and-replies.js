module.exports = {


  friendlyName: 'Find recordings and replies',


  description: 'Find recordings and replies by getting a recording id',


  inputs: {
    id: {
      type: 'number',
      required: false
    },
    where: {
      type: 'string',
      required: false
    },
    limit: {
      type: 'string',
      required: false
    },
    skip: {
      type: 'string',
      required: false
    },
    sort: {
      type: 'string',
      required: false
    },
  },


  exits: {

  },


  fn: async ({
    id,
    limit = 10,
    skip = 0,
    sort = 'createdAt DESC',
    where: whereRaw,
  }) => {
    const where = whereRaw ? JSON.parse(whereRaw) : {};
    const query = id || { where, limit, skip, sort };

    console.log('Recs Query', query);

    const populateReplies = async recording => {
      if (recording.replies.length) {
        const repliesIds = recording.replies.map(({ id }) => id);
        const repliesQuery = { where: { id: { 'in': repliesIds } }, sort };

        console.log('Replies Query', repliesQuery);

        recording.replies = await Recordings.find(repliesQuery).populateAll();
      }
      return recording;
    };

    const recordings = await Recordings.find(query).populateAll();

    return recordings.length
      ? await Promise.all(recordings.map(populateReplies))
      : recordings;
  }

};
