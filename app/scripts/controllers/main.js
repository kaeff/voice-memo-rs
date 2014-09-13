'use strict';

/**
 * @ngdoc function
 * @name voiceMemoRsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the voiceMemoRsApp
 */
angular.module('voiceMemoRsApp')
  .controller('MainCtrl', function ($scope) {

    var setupRecording = function () {
      var mediaConstraints = {
        audio: true
      };
      navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    };

    var setupRemoteStorage = function () {
      remoteStorage.access.claim('voicememos', 'rw');
      remoteStorage.displayWidget();
    };

    $scope.startRecording = function () {
      $scope.recording = true;
      $scope.mediaRecorder.start(600000);
    };

    $scope.stopRecording = function () {
      $scope.mediaRecorder.stop();
      $scope.recording = false;
    };

    $scope.saveRecording = function () {
      remoteStorage.voicememos.addMemo($scope.memoTitle, $scope.audioRecording).then(function () {
        console.log("save completed", arguments);
      });
    };

    $scope.recording = false;
    setupRecording();
    setupRemoteStorage();

    function onMediaSuccess(stream) {
      $scope.mediaRecorder = new MediaStreamRecorder(stream);
      $scope.mediaRecorder.mimeType = 'audio/ogg';
      $scope.mediaRecorder.ondataavailable = function (blob) {
        var blobURL = URL.createObjectURL(blob);
        console.log('data available', blob);
        $scope.audioRecording = blob;
      };
    }

    function onMediaError(e) {
      console.error('media error', e);
    }
  });

