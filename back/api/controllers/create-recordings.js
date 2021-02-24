module.exports = {


  friendlyName: 'Create recordings',


  description: 'Endpoint to create a new recording of a user.',


  inputs: {
    filename: {
      type: 'string',
      required: true
    },
    filesize: {
      type: 'string',
      required: true
    },
    filetype: {
      type: 'string',
      required: true
    },
    duration: {
      type: 'number',
      required: true
    },
    user: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },

  fn: async (inputs) => (
    Recordings.create(inputs).fetch()
  )

};
