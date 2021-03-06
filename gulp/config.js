const yargs = require('yargs');

yargs.option('browser', {type: 'string'});
yargs.option('concat', {type: 'boolean'});
yargs.option('env', {default: 'dev', type: 'string'});
yargs.option('minify', {type: 'boolean'});
yargs.option('open', {default: 'http://phpdraft.local', type: 'string'});
yargs.option('revAssets', {type: 'boolean'});
yargs.option('serve', {default: true, type: 'boolean'});
yargs.option('sourceMaps', {default: false, type: 'boolean'});
yargs.option('templates', {type: 'boolean'});

const {argv} = yargs;

module.exports = {//Is this here?
  options: {
    browser: argv.browser,
    concat: argv.concat,
    env: argv.env,
    minify: argv.minify,
    open: argv.open,
    revAssets: argv.revAssets,
    serve: argv.serve,
    sourceMaps: argv.sourceMaps,
    templates: argv.templates,
  },

  paths: {
    app: {
      config: `app/config/${argv.env}.json`,
      css: 'app/css/style.less',
      fonts: 'app/fonts/**/*',
      html: 'app/index.html',
      img: 'app/img/**/*',
      js: 'app/features/**/*.js',
      jsLoadOrder: [
        'app/features/app.js',
        'app/features/base/*.js',
        'app/features/**/*.module.js',
        'app/features/**/*.js',
      ],
      templates: 'app/features/**/*.html',
    },

    vendor: {
      fonts: [
        'node_modules/@bower_components/bootstrap/fonts/**/*',
        'node_modules/@bower_components/font-awesome/fonts/**/*',
      ],
      js: [
        'node_modules/@bower_components/jquery/dist/jquery.js',
        'node_modules/@bower_components/slip/slip.js',
        'node_modules/@bower_components/FlipClock/compiled/flipclock.js',
        'node_modules/@bower_components/datatables/media/js/jquery.dataTables.js',
        'node_modules/angular/angular.js',
        'node_modules/@bower_components/angular-datatables/dist/angular-datatables.js',
        'node_modules/@bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/@bower_components/angular-animate/angular-animate.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/@bower_components/ngstorage/ngStorage.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/@bower_components/ng-lodash/build/ng-lodash.js',
        'node_modules/@bower_components/angular-toastr/dist/angular-toastr.tpls.js',
        'node_modules/@bower_components/angular-recaptcha/release/angular-recaptcha.js',
        'node_modules/@bower_components/angular-toggle-switch/angular-toggle-switch.js',
        'node_modules/@bower_components/angular-validation-match/dist/angular-validation-match.js',
        'node_modules/@bower_components/ng-caps-lock/ng-caps-lock.js',
        'node_modules/@bower_components/moment/moment.js',
        'node_modules/@bower_components/angular-moment/angular-moment.js',
        'node_modules/@bower_components/angularjs-ordinal-filter/ordinal-browser.js',
        'node_modules/@bower_components/angular-mask/dist/ngMask.js',
        'node_modules/@bower_components/angular-slip/angular-slip.js',
        'node_modules/@bower_components/angular-flipclock/angular-flipclock.js',
        'node_modules/@bower_components/angular-strap/dist/modules/dimensions.js',
        'node_modules/@bower_components/angular-strap/dist/modules/debounce.js',
        'node_modules/@bower_components/angular-strap/dist/modules/affix.js',
        'node_modules/@bower_components/ng-file-upload/ng-file-upload.js',
        'node_modules/@bower_components/spin.js/spin.js',
        'node_modules/@bower_components/angular-loading/angular-loading.js',
        'node_modules/@bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      ],
      css: [
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        'node_modules/@bower_components/angular-toastr/dist/angular-toastr.css',
        'node_modules/@bower_components/datatables/media/css/jquery.dataTables.css',
        'node_modules/@bower_components/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.css',
        'node_modules/@bower_components/angular-toggle-switch/angular-toggle-switch.css',
        'node_modules/@bower_components/angular-toggle-switch/angular-toggle-switch-bootstrap.css',
        'node_modules/@bower_components/FlipClock/compiled/flipclock.css',
        'node_modules/@bower_components/angular-loading/angular-loading.css',
      ],
    },
  },
};
