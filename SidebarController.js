define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'mijit/_WidgetBase',
  'dojo/Evented',
  'dojo/query',
  'dojo/on',
  './sidebar/Sidebar',
  './layerswitcher/LayerSwitcher',
  './widgets/zonegrid/ZoneGrid',
  './widgets/zoneeditor/ZoneEditor',
  'crabpy_dojo/CrabpyWidget',
  'dojo/dom-construct',
  'dojo-form-controls/Button',
  'dojo/NodeList-dom'
], function (
  declare,
  lang,
  WidgetBase,
  Evented,
  query,
  on,
  Sidebar,
  LayerSwitcher,
  ZoneGrid,
  ZoneEditor,
  CrabpyWidget,
  domConstruct,
  Button
) {
  return declare([WidgetBase, Evented], {

    mapController: null,

    perceelService: null,

    tabs: null,

    crabpyUrl: null,

    postCreate: function () {
      this.inherited(arguments);
      //Set default values
      this._setDefaultParam(this.tabs, "layers", false);
      this._setDefaultParam(this.tabs, "zoom", true);
      this._setDefaultParam(this.tabs, "draw", false);
      this._setDefaultParam(this.tabs, "help", true);
    },

    startup: function () {
      this.inherited(arguments);
    },

    _setDefaultParam: function (object, field, defValue) {
      if (!lang.exists(field, object)) {
        lang.setObject(field, defValue, object);
      }
    },

    createSidebar: function (node) {
      var sidebar = new Sidebar({}, node);
      query(".ol-attribution").addClass("sidebar-padding");

      if (this.tabs.layers) {
        var layerTab = sidebar.createTab('Kaartlagen', 'fa-list',
          'Hier kan je kiezen welke lagen er op de kaart moeten getoond worden en welke niet.');

        var layerNode = domConstruct.create("div");
        layerTab.addContent(layerNode);

        var layerSwitcher = new LayerSwitcher ({
          map: this.mapController.olMap,
          div: layerNode
        });
        layerTab.registerWidget(layerSwitcher);
      }

      if (this.tabs.zoom) {
        var ZoomTab = sidebar.createTab('Zoom naar', 'fa-search',
          'Hier kan je naar een perceel of adres zoomen (je moet minstens een gemeente kiezen).');

        var crabpyWidget = new CrabpyWidget({
          name: "location",
          baseUrl: this.crabpyUrl
        });

        var crabNode = domConstruct.create("div");
        ZoomTab.addContent(crabNode);
        var crabZoomer = crabpyWidget.createCrabZoomer(crabNode);
        var self = this;
        var zoomButton = new Button({
          label: "Zoom naar adres",
          'class': "sidebar-button",
          onClick: function () {
            var bbox = crabZoomer.getBbox();
            if (bbox) {
              var extent = self.mapController.transformExtent(bbox,  'EPSG:31370', 'EPSG:900913');
              self.mapController.zoomToExtent(extent);
              crabZoomer.reset();
              sidebar.collapse();
            }
          }
        });
        ZoomTab.addContent(zoomButton.domNode);

        var capakeyNode = domConstruct.create("div");
        ZoomTab.addContent(capakeyNode);
        var capakeyZoomer = crabpyWidget.createCapakeyZoomer(capakeyNode);
        var capakeyZoomButton = new Button({
          label: "Zoom naar perceel",
          'class': "sidebar-button",
          onClick: function () {
            var bbox = capakeyZoomer.getBbox();
            if (bbox) {
              var extent = self.mapController.transformExtent(bbox,  'EPSG:31370', 'EPSG:900913');
              self.mapController.zoomToExtent(extent);
              capakeyZoomer.reset();
              sidebar.collapse();
            }
          }
        });
        ZoomTab.addContent(capakeyZoomButton.domNode);
      }

      if (this.tabs.draw) {
        var drawTab = sidebar.createTab('Bepaal zone', 'fa-pencil', 'Baken een zone af voor het beheersplan.');

        /* ZONE */
        var zonePane = domConstruct.create('div');
        drawTab.addContent(zonePane);
        var zoneGrid = new ZoneGrid({
          polygonStore: this.mapController.polygonStore
        }, zonePane);
        drawTab.registerWidget(zoneGrid);

        on(zoneGrid, 'click.zone', lang.hitch(this, function (evt) {
          switch(evt.action) {
            case 'delete':
              this.mapController.stopAllDrawActions();
              this.zone = null;
              sidebar.emit('zone.deleted');
              break;
            case 'zoom':
              this.mapController.zoomToZone();
              break;
            case 'flash':
              console.info('zonegrid::zoom flash');
              this.mapController.flashFeature(zoneGrid.makeMultiPolygon());
              break;
          }
        }));

        on(zoneGrid, 'click.polygon', lang.hitch(this, function (evt) {
          switch(evt.action) {
            case 'zoom':
              this.mapController.zoomToPolygon(evt.polygon);
              break;
            case 'flash':
              this.mapController.flashFeature(evt.polygon);
              break;
          }
        }));

        /* TOEVOEGEN */
        var zoneEditPane = domConstruct.create('div');
        drawTab.addContent(zoneEditPane);
        var zoneEditor = new ZoneEditor({
          mapController: this.mapController
        }, zoneEditPane);
        drawTab.registerWidget(zoneEditor);

        //var removeTitle = domConstruct.create("div", {innerHTML: "Verwijder een polygoon uit de selectie"});
        //domConstruct.place(removeTitle, drawTab);
        //
        //var toolbarNode2 = domConstruct.create("div", {'class': 'buttons'});
        //domConstruct.place(toolbarNode2, drawTab);
        //
        //var selectButton = new Button({
        //  label: "Kies polygoon",
        //  'class': "sidebar-button",
        //  onClick: lang.hitch(this, function () {
        //    this.mapController.startSelect();
        //  })
        //});
        //domConstruct.place(selectButton.domNode, toolbarNode2);
        //
        //var removeButton = new Button({
        //  label: "Verwijderen",
        //  'class': "sidebar-button",
        //  onClick: lang.hitch(this, function () {
        //    this.mapController.removeSelectedItems();
        //  })
        //});
        //domConstruct.place(removeButton.domNode, toolbarNode2);
        //
        //var cancelRemoveButton = new Button({
        //  label: "Annuleren",
        //  'class': "sidebar-button",
        //  onClick: lang.hitch(this, function () {
        //    this.mapController.stopSelect();
        //  })
        //});
        //domConstruct.place(cancelRemoveButton.domNode, toolbarNode2);
        //

        /* BUTTONS */
        var bottomButtonsNode = domConstruct.create('div', {'class': 'zoneerder-draw-buttons'});
        drawTab.addContent(bottomButtonsNode);

        new Button({
          label: "Bewaar",
          'class': "sidebar-button",
          onClick: lang.hitch(this, function () {
            var zone = this.mapController.getZone();
            this.mapController.stopAllDrawActions();
            if (zone) {
              this.zone = zone;
              sidebar.emit("zone.saved", {zone: zone});
            }
            else {
              alert("Er is nog geen zone beschikbaar om op te slaan.");
            }
          })
        }).placeAt(bottomButtonsNode);

        new Button({
          label: "Annuleer",
          'class': "sidebar-button",
          onClick: lang.hitch(this, function () {
            console.info('TODO: implement cancel');
            this.mapController.stopDraw();
            this.mapController.stopParcelSelect();
          })
        }).placeAt(bottomButtonsNode);
      }

      if (this.tabs.help) {
        sidebar.createTab('Help', 'fa-question-circle', 'I need somebody');
      }

      return sidebar;
    }
  });
});
