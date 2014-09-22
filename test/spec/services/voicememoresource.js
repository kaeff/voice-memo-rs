'use strict';

describe('Service: VoicememoResource', function () {

  // load the service's module
  beforeEach(module('voiceMemoRsApp'));

  // instantiate service
  var VoicememoResource;
  beforeEach(inject(function (_VoicememoResource_) {
    VoicememoResource = _VoicememoResource_;
  }));

  it('#addMemo', function () {
    expect(VoicememoResource.addMemo).toBeDefined();
  });

});
