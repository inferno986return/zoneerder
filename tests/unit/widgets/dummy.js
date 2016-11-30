define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var dummy = require('widgets/dummy/dummy');

  registerSuite({
    name: 'hello',

    greet: function () {
      assert.strictEqual(dummy.greet('Murray'), 'Hello, Murray!',
        'hello.greet should return a greeting for the person named in the first argument');
      assert.strictEqual(dummy.greet(), 'Hello, world!',
        'hello.greet with no arguments should return a greeting to "world"');
    }
  });
});