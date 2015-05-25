(function(factory) {

  var root = window;

  root.fa = factory(root, {}, root.ss);

}(function(root, fa, ss) {

  fa.VERSION = "0.0.2";

  var configuration = {
    filename: "file"
  };

  var conf = function(config) {

    configuration.button = config.button || "";
    configuration.url = config.url || "";
    configuration.policy = config.policy || "";
    configuration.signature = config.signature || "";
    configuration.filename = config.filename || "";
    configuration.osskey = config.osskey || "";
    configuration.onComplete = config.onComplete;
    configuration.onProgress = config.onProgress;
    configuration.onError = config.onError;
    configuration.onSubmit = config.onSubmit;
    configuration.allowedExtensions = config.extensions;
  }

  fa.uploader = function(config) {

    conf(config);

    var uploader = new ss.SimpleUpload({
      button: document.getElementById(configuration.button),
      url: configuration.url,
      name: "file",
      cors: true,
      multipart: true,
      method: "post",
      data: {
        OSSAccessKeyId: configuration.osskey,
        policy: configuration.policy,
        Signature: configuration.signature,
        success_action_status: "201",
        key: configuration.filename
      },
      onComplete: configuration.onComplete,
      onProgress: configuration.onProgress,
      onError: configuration.onError,
      onSubmit: configuration.onSubmit
    });

    return uploader;
  }

  return fa;
}));
