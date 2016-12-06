zoneerder
===========
UPDATE: master is nu de 0.4 versie.

Opgelet: er zijn nu 2 versies 0.3 en 0.4. De 0.4 versie gebruikt dgrid v0.4 en dstore.

Development gebeurt op 2 aparte branches: dev-0.3 en dev-0.4.

Dojo widget met een configureerbare Openlayers 3 kaart.

Voorbeeld config:

```
    var zoneMapConfig = {
        buttons: {
            fullScreen: true,
            zoomInOut: true,
            zoomFullExtent: true,
            zoomGeolocation: true,
            rotate: true
        },
        sidebar: {
            layers: true,
            zoom: true,
            draw: true,
            help: true
        },
        tools: {
            selectBescherming: true,
            selectPerceel: true,
            drawPolygon: true,
            drawWKT: true
        },        
        onZoneClickPopup: true,
        historicLayers: true,
        erfgoedUrl: 'https://dev-geo.onroerenderfgoed.be/zoekdiensten/afbakeningen',
        niscodeUrl: 'https://dev-geo.onroerenderfgoed.be/zoekdiensten/administratievegrenzen',
        perceelUrl: 'https://dev-geo.onroerenderfgoed.be/ogcproxy?url=https://geo.agiv.be/ogc/wfs/grb',
        crabpyUrl: 'https://dev-geo.onroerenderfgoed.be',
        beschermingUrl: 'https://dev-geo.onroerenderfgoed.be/geoserver/wms',
        beschermingWfsUrl: 'https://dev-geo.onroerenderfgoed.be/geoserver/wfs',
        ogcproxyUrl: 'https://dev-geo.onroerenderfgoed.be/ogcproxy?url='
    };
```

Testen
run 'npm start'
ga naar
http://localhost:8000/tests/runTests.html
of
http://localhost:8000/node_modules/intern/client.html?config=tests/intern