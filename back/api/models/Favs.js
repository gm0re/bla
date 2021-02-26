/**
 * Recordings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    userId:{
      model:'users',
      required: true
    },

    recordingId: {
      model: 'recordings',
      required: true
    }
  }

};

