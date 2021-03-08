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
    noFileAttached: {
      description: 'No file was attached.',
      responseType: 'badRequest'
    },

    tooBig: {
      description: 'The file is too big.',
      responseType: 'badRequest'
    }
  },

  fn: async function({ recording, userId, parentId = null }) {
    let filepath = 'uploads';

    const maxBytes = 1000000;
    const filename = uniqid();
    const dirname = require('path').resolve(sails.config.appPath, `.tmp/public/${filepath}`);

    const saveAs = (newRecordingFile, next) => {
      const [mimetype] = newRecordingFile.headers['content-type'].split(';');
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

    const uploadedRec = await sails.uploadOne(recording, {
      dirname,
      maxBytes,
      saveAs
    })
    .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
    .intercept(err => new Error(`The photo upload failed: ${util.inspect(err)}`));

    if(!uploadedRec) {
      throw 'noFileAttached';
    }

    const { size: filesize, type: filetype } = uploadedRec;

    const recordingData = {
      filepath,
      filesize,
      filetype,
      filename,
      duration: 0,
      user: userId,
      parent: parentId
    };

    const newRecording = await Recordings.create(recordingData).fetch();

    console.log('New rec stored: ', newRecording);

    return newRecording;
  }

};
