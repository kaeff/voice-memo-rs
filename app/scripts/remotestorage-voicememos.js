'use strict';

RemoteStorage.defineModule('voicememos', function(privateClient, publicClient) {

  // Define a common data type using JSON Schema
  privateClient.declareType('voicememo', {
    'description': 'A memo in spoken language',
    'type': 'object',
    'properties': {
      'id': {
        'type': 'string',
        'format': 'id'
      },
      'title': {
        'type': 'string'
      },
      'file': {
        'type': 'object',
        'properties': {
          'mimeType': {
            'type': 'string'
          },
          'size': {
            'type': 'number'
          },
          'url': {
            'type': 'string',
            'format': 'uri'
          }
        },
        'required': ['mimeType', 'size', 'url']
      }
    },
    'required': ['id']
  });

  var handleError = function (error) {
    console.log(error);
  };

  var saveRecording = function (id, blob) {
    var promise = promising();
    var recordingName = 'recordings/' + id;
    var fileReader = new FileReader();

    fileReader.onload = function() {
      privateClient.storeFile(blob.type, recordingName, this.result).then(function() {
        promise.fulfill(privateClient.getItemURL(recordingName));
      });
    };
    fileReader.readAsArrayBuffer(blob);

    return promise;
  };

  var addMemo = function (title, blob) {
    var id = new Date().getTime().toString();

    var saveMemo = function (recordingUrl) {
      return privateClient.storeObject('voicememo', id, {
        id: id,
        title: title || '',
        file: {
          mimeType: blob.type,
          size: blob.size,
          url: recordingUrl
        }
      });
    };

    return saveRecording(id, blob).then(saveMemo).then(function () { }, handleError);
  };

  return {
    exports: {
      addMemo: addMemo
    }
  };
});
