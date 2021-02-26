module.exports = {


  friendlyName: 'Delete star by user id and recording id',


  description: 'Remove starred recording of a user.',


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
    Stars.destroy(inputs)
  )


};
