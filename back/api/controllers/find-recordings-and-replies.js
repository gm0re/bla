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


  fn: async (inputs) => {
    const { id } = inputs;
    const limit = inputs.limit || 10;
    const skip = inputs.skip || 0;
    const sort = inputs.sort || 'createdAt DESC';
    const where = inputs.where ? JSON.parse(inputs.where) : {};

    const recordings = await Recordings.find(id || { where, limit, skip, sort }).populateAll();

    if (recordings.length) {
      const populateReplies = async recording => {
        if (recording.replies.length) {
          const repliesIds = recording.replies.map(({ id }) => id);

          recording.replies = await Recordings.find({ id: { 'in': repliesIds }}).populateAll();
        }
        return recording;
      }
      return await Promise.all(recordings.map(populateReplies));
    }

    return [];
  }


};
