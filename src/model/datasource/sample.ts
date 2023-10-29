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
  LayerRasterMapboxBuild,
  LayerSimpleMapboxBuild,
  LayerSourceBuild
} from "./build";
import type {
  OptionGeojson,
  OptionRasterJson,
  OptionRasterTile
} from "@/interface/sample";

import { ABuild } from "./build/_default";
import { Layer } from "./Layer";
import { LayerActionBuild } from "./build/action";
import LayerInfo from "@map/modules/LayerControl/Detail/LayerInfo.vue";
import { getChartRandomColor } from "@/utils/color";

export function createRasterUrlLayer({
  name,
  tiles,
  bounds,
  builds
}: OptionRasterTile) {
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  let temp_builds: ABuild[] = [
    new LayerListBuild(),
    new LayerSourceBuild(
      new RasterSourceBuild().setTiles(tiles).setBounds(bounds)
    ),
    new LayerMapBuild().setLayer(new LayerRasterMapboxBuild().build()),
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
  if (builds) {
    temp_builds = [...temp_builds, ...builds];
  }
  temp_builds.forEach((build) => build.setForLayer(layer));
  return layer;
}
export function createRasterJsonLayer({ name, url, builds }: OptionRasterJson) {
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  let temp_builds: ABuild[] = [
    new LayerListBuild(),
    new LayerSourceBuild(new RasterSourceBuild().setUrl(url)),
    new LayerMapBuild().setLayer(new LayerRasterMapboxBuild().build()),
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
  if (builds) {
    temp_builds = [...temp_builds, ...builds];
  }
  temp_builds.forEach((build) => build.setForLayer(layer));
  return layer;
}

export function createGeoJsonLayer({
  name,
  geojson,
  type,
  color,
  builds
}: OptionGeojson) {
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  color = color || getChartRandomColor();
  let temp_builds: ABuild[] = [
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
    })
  ];
  if (builds) {
    temp_builds = temp_builds.concat(builds);
  }
  temp_builds.forEach((build) => build.setForLayer(layer));
  return layer;
}
