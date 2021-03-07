const uniqid = require('uniqid');

module.exports = {


  friendlyName: 'Recordings uploading',


  description: 'Create a new user recording and save the recording file.',

  files: ['recording'],

  inputs: {
    recording: {
      type: 'ref',
      required: true
    },
    userId: {
      type: 'number',
      required: true
    },
    parentId: {
      type: 'number'
    },
  },

  exits: {

  },

  fn: function({ userId, parentId = null }) {
    let filepath = 'uploads';

    const filename = uniqid();
    const dirname = require('path').resolve(sails.config.appPath, `.tmp/public/${filepath}`);

    const saveAs = (__newFileStream, next) => {
      const [mimetype] = __newFileStream.headers['content-type'].split(';');
      const [_, extension] = mimetype.split('/');

      try {
        const newRecFilePath = `${userId}/${filename}.${extension}`;

        filepath = `${filepath}/${newRecFilePath}`;

        console.log('Writting file: ', `${dirname}/${newRecFilePath}`);

        next(undefined, newRecFilePath);
      } catch (error) {
        throw new Error(`Could not determine appropriate filename. ${error}`);
      }
    };

    const saveRecording = async (err, recordingFiles) => {
      if (err) {
        return this.res.serverError(err);
      }

      if (!recordingFiles.length) {
        return this.res.badRequest('No file was uploaded.');
      }

      const [{ size: filesize, type: filetype }] = recordingFiles;

      const recording = {
        filepath,
        filesize,
        filetype,
        filename,
        duration: 0,
        user: userId,
        parent: parentId
      };

      const newRecording = await Recordings.create(recording).fetch();

      console.log('New rec stored: ', newRecording);

      return newRecording;
    };

    this.req.file('recording').upload({
      maxBytes: 1000000,
      dirname,
      saveAs
    }, saveRecording);
  }

};
