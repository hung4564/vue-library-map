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
  LayerSimpleMapboxBuild
} from "./build";
import type {
  OptionDefault,
  OptionGeojson,
  OptionRasterJson,
  OptionRasterTile
} from "@/interface/sample";

import { ABuild } from "./build/_default";
import { KEY_BUILD } from "./type";
import { Layer } from "./Layer";
import { LayerAction } from "@/interface/datasource/action";
import { LayerActionBuild } from "./part/action";
import { LayerComponentBuild } from "./part/component";
import { LayerEditSourceBuild } from "./extra/edit-source";
import { LayerInfoShowBuild } from "./extra/info-show";
import { getChartRandomColor } from "@/utils/color";

export function setupDefault(
  layer: Layer,
  default_options: Required<OptionDefault>,
  options: OptionDefault = {}
) {
  const {
    builds: default_builds,
    actions: default_actions,
    source
  } = default_options;
  let { builds = [], actions = [] } = options;
  if (default_builds) {
    builds = [...default_builds, ...builds];
  }
  if (default_actions && default_actions.length > 0) {
    actions = [...default_actions, ...actions];
  }
  layer.setAction(new LayerActionBuild().addActions(actions).build(layer));
  layer.setView(KEY_BUILD.COMPONENT, new LayerComponentBuild().build(layer));
  layer.setSource(source.build());
  builds.forEach((build) => build.setForLayer(layer));
  return layer;
}
export function createRasterUrlLayer(options: OptionRasterTile) {
  const layer = new Layer();
  const { name, tiles, bounds } = options;
  layer.setInfo({ name, metadata: {} });
  const builds: ABuild[] = [
    new LayerListBuild(),
    new LayerInfoShowBuild({
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
              bounds && `${bounds[0]}, ${bounds[1]}, ${bounds[2]},${bounds[3]}`
            );
          }
        },
        {
          trans: "map.layer-control.field.tiles",
          value: (layer: Layer<RasterSource>) => {
            return layer.source.option.tiles?.join(",\n");
          }
        }
      ]
    }),
    new LayerMapBuild().setLayer(new LayerRasterMapboxBuild().build())
  ];

  const actions: LayerAction[] = [];
  const source = new RasterSourceBuild().setTiles(tiles).setBounds(bounds);
  return setupDefault(layer, { builds, actions, source }, options);
}
export function createRasterJsonLayer(options: OptionRasterJson) {
  const { name, url } = options;
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  const builds: ABuild[] = [
    new LayerListBuild(),
    new LayerInfoShowBuild({
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
              bounds && `${bounds[0]}, ${bounds[1]}, ${bounds[2]},${bounds[3]}`
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
    }),
    new LayerMapBuild().setLayer(new LayerRasterMapboxBuild().build())
  ];
  const source = new RasterSourceBuild().setUrl(url);

  const actions: LayerAction[] = [];
  return setupDefault(layer, { builds, actions, source }, options);
}

export function createGeoJsonLayer(options: OptionGeojson) {
  const { name, geojson, type } = options;
  let { color } = options;
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  color = color || getChartRandomColor();
  const builds: ABuild[] = [
    new LayerListBuild().setColor(color),
    new LayerIdentifyBuild(),
    new LayerInfoShowBuild({
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
              bounds && `${bounds[0]}, ${bounds[1]}, ${bounds[2]},${bounds[3]}`
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
    }),
    new LayerEditSourceBuild()
  ];
  if (type) {
    builds.push(
      new LayerMapBuild().setLayer(
        new LayerSimpleMapboxBuild().setStyleType(type).setColor(color).build()
      )
    );
  }
  const source = new GeoJsonSourceBuild().setData(geojson);
  const actions: LayerAction[] = [];
  return setupDefault(layer, { builds, actions, source }, options);
}
