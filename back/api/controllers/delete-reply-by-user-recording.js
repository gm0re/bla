module.exports = {


  friendlyName: 'Delete reply by user id and recording id',


  description: 'Remove replied recording of a user.',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
    recordingId: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },

  fn: async inputs => (
    Replies.destroy(inputs)
  )

};
