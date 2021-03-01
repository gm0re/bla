/**
 * Recordings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    filename: { type: 'string', required: true, unique: true },
    filetype: { type: 'string', required: true },
    filesize: { type: 'number', columnType: 'float', required: true },
    duration: { type: 'number', columnType: 'float', required: true },

    parent: {
      model: 'recordings',
      columnName: 'parentId'
    },

    user: {
      model: 'users',
      columnName: 'userId'
    },

    favedBy: {
      collection: 'users',
      via: 'recordingId',
      through: 'favs'
    },

    repliedBy: {
      collection: 'users',
      via: 'recordingId',
      through: 'replies'
    },

    sharedBy: {
      collection: 'users',
      via: 'recordingId',
      through: 'shares'
    },

    starredBy: {
      collection: 'users',
      via: 'recordingId',
      through: 'stars'
    }
  }

};

