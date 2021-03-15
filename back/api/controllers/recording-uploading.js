const uniqid = require('uniqid');
const fs = require('fs');

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

  exits: {},

  fn: async function({ userId, parentId = null }) {
    const req = this.req;
    const filename = uniqid();
    const dirname = require('path').resolve(sails.config.appPath, 'assets');

    return new Promise((resolve, reject) => {
      req.file('recording').upload((err, uploadedFiles) => {
        if (err) return res.serverError(err);

        const [uploadedRecording] = uploadedFiles;

        fs.readFile(uploadedRecording.fd, async (err, audioFile) => {
          if (err) throw new Error(err);

          const [mimetype] = uploadedRecording.type.split(';');
          const [, fileextention] = mimetype.split('/');

          const fileBuffer = Buffer.from(audioFile);
          const audioFilePath = `${dirname}/${filename}.${fileextention}`;
          const bufferFilePath = `${dirname}/${filename}.json`;

          fs.writeFile(audioFilePath, fileBuffer, (err) => {
            if (err) throw new Error(err);

            console.log(`The data file has been saved! File path: ${audioFilePath}`);
          });

          fs.writeFile(bufferFilePath, JSON.stringify(fileBuffer.toJSON()), (err) => {
            if (err) throw new Error(err);

            console.log(`The audio has been saved! File path: ${fileBuffer.toJSON().data.length}`);
            console.log(`File data size: ${fileBuffer.toJSON().data.length}`);
          });

          const { size: filesize, type: filetype } = uploadedRecording;

          const recordingData = {
            fileextention,
            filepath: `${filename}.${fileextention}`,
            filesize,
            filetype,
            filename,
            duration: 0,
            user: userId,
            parent: parentId
          };

          const newRecording = await Recordings.create(recordingData).fetch();

          console.log('New recording record stored:', newRecording);

          return err ?
            reject(err) :
            resolve(newRecording);
        });
      });
    });
  }

};
