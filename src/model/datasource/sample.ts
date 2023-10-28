import {
  GeoJsonSourceBuild,
  GeojsonDataHandle,
  RasterSource,
  RasterSourceBuild
} from "./view/source";
import {
  LayerIdentifyBuild,
  LayerListBuild,
  LayerMapBuild,
  LayerSimpleMapboxBuild,
  LayerSourceBuild
} from "./build";
import type {
  OptionGeojson,
  OptionRasterJson,
  OptionRasterTile
} from "@/interface/sample";

import { Layer } from "./Layer";
import { LayerActionBuild } from "./build/action";
import LayerInfo from "@map/modules/LayerControl/Detail/LayerInfo.vue";
import { LayerLegendBuild } from "./build/legend";
import LayerSingleColorLegend from "@map/modules/LayerControl/Legend/single-color.vue";
import { getChartRandomColor } from "@/utils/color";

export function createRasterUrlLayer({
  name,
  tiles,
  bounds
}: OptionRasterTile) {
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  const builds = [
    new LayerListBuild(),
    new LayerSourceBuild(
      new RasterSourceBuild().setTiles(tiles).setBounds(bounds)
    ),
    new LayerMapBuild().setLayer({
      type: "raster"
    }),
    new LayerActionBuild().addAction({
      id: "info",
      component: LayerInfo,
      menu: {
        name: "info",
        type: "item",
        icon: ""
      },
      option: {
        fields: [
          {
            trans: "map.layer-control.field.name",
            value: "name"
          },
          {
            trans: "map.layer-control.field.bound.title",
            value: (layer: Layer) => {
              const bounds = layer.metadata.bounds;
              return (
                bounds &&
                `${bounds[0]}, ${bounds[1]}, ${bounds[2]},${bounds[3]}`
              );
            }
          },
          {
            trans: "map.layer-control.field.tiles",
            value: (layer: Layer<RasterSource>) => {
              return layer.source.option.tiles;
            }
          }
        ]
      }
    })
  ];
  builds.forEach((build) => build.setForLayer(layer));
  return layer;
}
export function createRasterJsonLayer({ name, url }: OptionRasterJson) {
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  const builds = [
    new LayerListBuild(),
    new LayerSourceBuild(new RasterSourceBuild().setUrl(url)),
    new LayerMapBuild().setLayer({
      type: "raster"
    }),
    new LayerActionBuild().addAction({
      id: "info",
      component: LayerInfo,
      menu: {
        name: "info",
        type: "item",
        icon: ""
      },
      option: {
        fields: [
          {
            trans: "map.layer-control.field.name",
            value: "name"
          },
          {
            trans: "map.layer-control.field.bound.title",
            value: (layer: Layer) => {
              const bounds = layer.metadata.bounds;
              return (
                bounds &&
                `${bounds[0]}, ${bounds[1]}, ${bounds[2]},${bounds[3]}`
              );
            }
          },
          {
            trans: "map.layer-control.field.url",
            value: (layer: Layer<RasterSource>) => {
              return layer.source.option.url;
            },
            inline: true
          }
        ]
      }
    })
  ];
  builds.forEach((build) => build.setForLayer(layer));
  return layer;
}

export function createGeoJsonLayer({
  name,
  geojson,
  type,
  color
}: OptionGeojson) {
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  color = color || getChartRandomColor();
  const builds = [
    new LayerListBuild().setColor(color),
    new LayerSourceBuild(new GeoJsonSourceBuild().setData(geojson)),
    new LayerMapBuild().setLayer(
      new LayerSimpleMapboxBuild().setStyleType(type).setColor(color).build()
    ),
    new LayerIdentifyBuild(),
    new LayerActionBuild().addAction({
      id: "info",
      component: LayerInfo,
      menu: {
        name: "info",
        type: "item",
        icon: ""
      },
      option: {
        fields: [
          {
            trans: "map.layer-control.field.name",
            value: "name"
          },
          {
            trans: "map.layer-control.field.bound.title",
            value: (layer: Layer) => {
              const bounds = layer.metadata.bounds;
              return (
                bounds &&
                `${bounds[0]}, ${bounds[1]}, ${bounds[2]},${bounds[3]}`
              );
            }
          },
          {
            trans: "map.layer-control.field.geojson",
            value: (layer: Layer<GeojsonDataHandle>) => {
              const geojson = layer.source.geojson;
              return JSON.stringify(geojson, undefined, 2);
            },
            inline: true
          }
        ]
      }
    }),
    new LayerLegendBuild().setComponent(LayerSingleColorLegend).addItem({
      value: name,
      color: color
    })
  ];
  builds.forEach((build) => build.setForLayer(layer));
  return layer;
}
