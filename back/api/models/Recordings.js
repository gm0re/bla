/**
 * Recordings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'number', required: true, unique: true, autoIncrement: true },
    filename: { type: 'string', required: true, unique: true },
    filetype: { type: 'string', required: true },
    filesize: { type: 'number', columnType: 'float', required: true },
    length: { type: 'number', columnType: 'float', required: true },

    userId: {
      model: 'users'
    }
  }

};

