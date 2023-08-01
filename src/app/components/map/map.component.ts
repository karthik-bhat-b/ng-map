import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { RuleSet } from 'src/app/models/Rule';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public map!: Map;
  public orule!: RuleSet[];

  ngOnInit(): void {

    this.orule = [
      {
        rules: [
          {
            attribute: "income_grp",
            value: "1. High income: OECD"
          },
          {
            attribute: "economy",
            value: "2. Developed region: nonG7"
          }
        ],
        color: "green"
      },
      {
        rules: [
          {
            attribute: "income_grp",
            value: "5. Low income"
          }
        ],
        color: "red"
      }
    ];
    const portrayal = {
      ruleSet: this.orule
    }
    const vtLayer = new VectorTileLayer({
      declutter: true,
      source: new VectorTileSource({
        maxZoom: 15,
        format: new MVT({
          idProperty: 'iso_a3',
        }),
        url:
          'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
          'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
      }),
      style: function (feature, resolution) {
        //console.log(feature);
        return getStylePostValidation(feature, portrayal.ruleSet)
      },
    });

    this.map = new Map({
      layers: [
        vtLayer,
        new TileLayer({
          source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        })
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2, maxZoom: 18,
      }),
    });
    console.log(portrayal.ruleSet)
  }

}

function getStylePostValidation(feature: any, portrayalRuleset: RuleSet[]) {

  for (let item of portrayalRuleset) {
    let flag = true;

    for (let rule of item.rules) {
      if (feature.get(rule.attribute) != rule.value) {
        flag = false;
        break;
      }
    }

    if (flag) {
      return getStyles(item.color);
    }
  }
  return getStyles('black')
}

function getStyles(color: any) {
  return new Style({
    stroke: new Stroke({
      color: 'gray',
      width: 1,
    }),
    fill: new Fill({
      color: color,
    }),
  });
}



