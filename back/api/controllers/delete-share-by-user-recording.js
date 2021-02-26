module.exports = {


  friendlyName: 'Delete share by user id and recording id',


  description: 'Remove shared recording of a user.',


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
    Shares.destroy(inputs)
  )

};
