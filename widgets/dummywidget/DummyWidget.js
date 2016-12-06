define([
  'dijit/_TemplatedMixin',
  'dijit/_WidgetBase',

  'dojo/_base/declare',
  'dojo/text!./templates/dummywidget.html'
], function (
  _TemplatedMixin,
  _WidgetBase,

  declare,
  template
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    // description:
    //
    templateString: template,
    baseClass: 'dummywidget',
    dummyProp: null,

    // Properties to be sent into constructor

    postCreate: function () {
      // summary:
      //      Overrides method of same name in dijit._Widget.
      console.log('widgets.dummywidget.dummywidget::postCreate', arguments);

      this.setupConnections();

      this.inherited(arguments);
    },
    setupConnections: function () {
      // summary:
      //      wire events, and such
      console.log('widgets.dummywidget.dummywidget::setupConnections', arguments);

    },

    setData: function (value) {
        this.dummyProp = value;
    },

    getData: function () {
      return this.dummyProp;
    }

  });
});
