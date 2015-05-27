var util = require('../util');

exports.task = function() {
  return gulp.src(['src/core/', 'src/components/*' ])
      .pipe(through2.obj(function(folder, enc, next) {
        var moduleId = folder.path.indexOf('components') > -1
            ? 'material.components.' + path.basename(folder.path)
            : 'material.' + path.basename(folder.path);
        var stream = BUILD_MODE.useBower
            ? series(util.buildModule(moduleId, true), util.buildModule(moduleId, false))
            : util.buildModule(moduleId, false);
        stream.on('end', function() { next(); });
      }))
      .pipe(BUILD_MODE.transform());

};
