define([
  'intern!object',
  'intern/chai!assert',
  'zoneerder/widgets/dummywidget/DummyWidget'
], function (
  registerSuite,
  assert,
  DummyWidget
) {

  var dummyWidget;

  registerSuite({
    name: 'dummy widget',

    setup: function () {
      dummyWidget = new DummyWidget();
    },

    'get data before set': function () {
      assert.strictEqual(dummyWidget.getData(), null,
        'getdata should return default value (null) after widget creation.');
    },

    'get data after set': function () {
      assert.strictEqual(dummyWidget.getData(), null,
        'getdata should return null after widget creation.');
      var testData = 'test';
      dummyWidget.setData(testData);
      assert.strictEqual(dummyWidget.getData(), testData,
        'getdata should return the value that has been set using setdata.');
    }
  });
});