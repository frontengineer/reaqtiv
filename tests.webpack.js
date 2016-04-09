// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
// require('karma-babel-preprocessor/node_modules/babel-polyfill/dist/polyfill');

var testsContext = require.context('./src', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
