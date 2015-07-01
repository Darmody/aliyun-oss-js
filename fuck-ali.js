(function(factory) {

  var root = window;

  root.fa = factory(root, {}, root.ss);

}(function(root, fa, ss) {

  fa.VERSION = "0.0.3";

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
    configuration.onComplete = config.onComplete || function(){};
    configuration.onProgress = config.onProgress || function(){};
    configuration.onError = config.onError || function(){};
    configuration.onSubmit = config.onSubmit || function(){};
    configuration.allowedExtensions = config.extensions || function(){};
  }

  fa.uploader = function(config) {

    conf(config);

    var data = {
        OSSAccessKeyId: configuration.osskey,
        policy: configuration.policy,
        Signature: configuration.signature,
        success_action_status: "201",
        key: configuration.filename
    };

    var uploader = new ss.SimpleUpload({
      button: document.getElementById(configuration.button),
      url: configuration.url,
      name: "file",
      cors: true,
      multipart: true,
      allowedExtensions: configuration.allowedExtensions,
      method: "post",
      data: data,
      onComplete: function(filename, response) {
        extension = ss.getExt(filename);
        filename = configuration.filename + "." + extension;

        configuration.onComplete.call(this, filename, response);
      },
      onProgress: configuration.onProgress,
      onError: configuration.onError,
      onSubmit: function(filename, extension) {
        // 根据上传的文件修改文件后缀名
        data.key = conf.filename + "." + extension;
        this.setOptions( { data: data } )

        configuration.onSubmit.call(this, filename, extension);
      }
    });

    return uploader;
  }

  return fa;
}));
