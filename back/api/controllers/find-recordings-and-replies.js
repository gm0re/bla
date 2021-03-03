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

    const popRecWithReplies = async recording => {
      const getRecWithReplies = async rec => {
        const repliesIds = rec.replies.map(({ id }) => id);
        const repliesQuery = { where: { id: { 'in': repliesIds } }, sort };

        console.log('Replies Query', repliesQuery);

        const replies = await Recordings.find(repliesQuery).populateAll();

        return {
          ...rec,
          replies
        }
      };

      return recording.replies.length
        ? getRecWithReplies(recording)
        : recording;
    };

    const recordings = await Recordings.find(query).populateAll();

    return recordings.length
      ? Promise.all(recordings.map(popRecWithReplies))
      : recordings;
  }

};
