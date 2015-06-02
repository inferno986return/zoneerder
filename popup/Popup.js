define([
  'dojo/_base/declare',
  'mijit/_WidgetBase',
  'mijit/_TemplatedMixin',
  'dojo/text!./Popup.html',
  'dojo/_base/lang'
], function (
  declare,
  WidgetBase,
  TemplatedMixin,
  template,
  lang
) {
  return declare([WidgetBase, TemplatedMixin], {

    templateString: template,
    map: null,
    enabled: true,
    _overlay: null,

    postCreate: function () {
      console.debug('Popup::postCreate');
      this.inherited(arguments);
      this._overlay = this._createOverlay(this.popup);
      this.map.addOverlay(this._overlay);
      this._createClickHandler(this.map);
    },

    startup: function () {
      this.inherited(arguments);
      console.debug('Popup::startup');
    },

    /**
     * Add a click handler to the map to render the popup.
     */
    _createClickHandler: function (map) {
      map.on('singleclick', lang.hitch( this, function (evt) {
        console.debug('Popup::clickhandler');
        if (this.enabled) {
          var coordinate = evt.coordinate;
          this.setContent('<em>' + coordinate + '</em>');
          this._overlay.setPosition(coordinate);
        }
      }));
    },

    /**
     * Create an overlay to anchor the popup to the map.
     * @return {ol.Overlay} the created overlay
     */
    _createOverlay: function (element) {
      console.debug('Popup::_createOverlay');
      return new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: element,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));
    },

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    _closePopup: function(evt) {
      console.debug('Popup::_closePopup');
      evt.preventDefault();
      this._overlay.setPosition(undefined);
      this.popupcloser.blur();
      return false;
    },


    setContent: function (content) {
      console.debug('Popup::_setContent');
      this.popupcontent.innerHTML = content;
    }

  });
});
