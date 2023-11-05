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
  OptionDefault,
  OptionGeojson,
  OptionRasterJson,
  OptionRasterTile
} from "@/interface/sample";

import { ABuild } from "./build/_default";
import { Layer } from "./Layer";
import { LayerAction } from "@/interface/datasource/action";
import { LayerActionBuild } from "./build/action";
import LayerInfo from "@map/modules/LayerControl/Detail/LayerInfo.vue";
import { getChartRandomColor } from "@/utils/color";

export function setupDefault(
  layer: Layer,
  default_options: OptionDefault = {},
  options: OptionDefault = {}
) {
  const { builds: default_builds, actions: default_actions } = default_options;
  let { builds = [], actions = [] } = options;
  if (default_builds) {
    builds = [...default_builds, ...builds];
  }
  if (default_actions && default_actions.length > 0) {
    actions = [...default_actions, ...actions];
  }
  if (actions && actions.length > 0) {
    builds.push(new LayerActionBuild().addActions(actions));
  }
  builds.forEach((build) => build.setForLayer(layer));
  builds.forEach((build) => {
    if (build.runAfterSetLayer) {
      build.runAfterSetLayer(layer);
    }
  });
  return layer;
}
export function createRasterUrlLayer(options: OptionRasterTile) {
  const layer = new Layer();
  const { name, tiles, bounds } = options;
  layer.setInfo({ name, metadata: {} });
  const builds: ABuild[] = [
    new LayerListBuild(),
    new LayerSourceBuild(
      new RasterSourceBuild().setTiles(tiles).setBounds(bounds)
    ),
    new LayerMapBuild()
      .setLayer(new LayerRasterMapboxBuild().build())
      .setEditable()
  ];

  const actions: LayerAction[] = [
    {
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
    }
  ];
  return setupDefault(layer, { builds, actions }, options);
}
export function createRasterJsonLayer(options: OptionRasterJson) {
  const { name, url } = options;
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  const builds: ABuild[] = [
    new LayerListBuild(),
    new LayerSourceBuild(new RasterSourceBuild().setUrl(url)),
    new LayerMapBuild()
      .setLayer(new LayerRasterMapboxBuild().build())
      .setEditable()
  ];

  const actions: LayerAction[] = [
    {
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
    }
  ];
  return setupDefault(layer, { builds, actions }, options);
}

export function createGeoJsonLayer(options: OptionGeojson) {
  const { name, geojson, type } = options;
  let { color } = options;
  const layer = new Layer();
  layer.setInfo({ name, metadata: {} });
  color = color || getChartRandomColor();
  const builds: ABuild[] = [
    new LayerListBuild().setColor(color),
    new LayerSourceBuild(new GeoJsonSourceBuild().setData(geojson)),
    new LayerIdentifyBuild()
  ];
  if (type) {
    builds.push(
      new LayerMapBuild()
        .setLayer(
          new LayerSimpleMapboxBuild()
            .setStyleType(type)
            .setColor(color)
            .build()
        )
        .setEditable()
    );
  }
  const actions: LayerAction[] = [
    {
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
    }
  ];
  return setupDefault(layer, { builds, actions }, options);
}
