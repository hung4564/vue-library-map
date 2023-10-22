/* eslint-disable no-unused-vars */
import { Color, CoordinatesNumber, MapSimple } from "@/interface/map";

import { Marker } from "mapbox-gl";
import { View } from "./_view";

type onDragMarker = (
  coordinates: CoordinatesNumber[],
  coordinate: CoordinatesNumber,
  index: number,
  marker: Marker
) => void;
type onRightClickMarker = (
  coordinates: CoordinatesNumber[],
  coordinate: CoordinatesNumber,
  index: number,
  marker: Marker
) => void;
type bindOnDragMaker = (
  marker: Marker,
  index: number,
  coordinates: CoordinatesNumber[]
) => void;
type bindOnRightClickMarker = (
  marker: Marker,
  index: number,
  coordinates: CoordinatesNumber[]
) => void;
export class MapMarkerView extends View {
  protected map: MapSimple;
  protected markers: any[] = [];
  protected color: Color = "#fff";
  protected onDragMarker?: onDragMarker;
  protected bindOnDragMaker?: bindOnDragMaker;
  protected onRightClickMarker?: onRightClickMarker;
  protected bindOnRightClickMarker?: bindOnRightClickMarker;
  constructor(map: MapSimple) {
    super();
    this.map = map;
    this.markers = [];
  }
  setColor(color: Color) {
    this.color = color;
    return this;
  }
  view({ coordinates = [] } = {}) {
    const draggable = !!this.onDragMarker;
    if (this.onDragMarker && !this.bindOnDragMaker) {
      this.bindOnDragMaker = function (
        marker: Marker,
        index: number,
        coordinates: CoordinatesNumber[]
      ) {
        const lngLat = marker.getLngLat();
        const new_coordinate: CoordinatesNumber = [lngLat.lng, lngLat.lat];
        const new_coordinates = coordinates.slice();
        new_coordinates[index] = new_coordinate;
        if (this.onDragMarker)
          this.onDragMarker(new_coordinates, new_coordinate, index, marker);
      };
    }
    if (this.onRightClickMarker && !this.bindOnRightClickMarker) {
      this.bindOnRightClickMarker = function (
        marker: Marker,
        index: number,
        coordinates: CoordinatesNumber[]
      ) {
        const lngLat = marker.getLngLat();
        if (this.onRightClickMarker)
          this.onRightClickMarker(
            coordinates,
            [lngLat.lng, lngLat.lat],
            index,
            marker
          );
      };
    }
    const marker_remove = this.markers.slice(coordinates.length - 1);
    this.markers = this.markers.slice(0, coordinates.length - 1);
    marker_remove.forEach((m) => {
      m.remove();
    });
    coordinates.forEach((coordinate, index) => {
      if (!coordinate[0] || !coordinate[1]) {
        return;
      }
      let marker = this.markers[index];
      if (!marker) {
        marker = getMarkerNode({ color: this.color, draggable });
        this.markers[index] = marker;
      }
      marker
        .setLngLat({ lng: coordinate[0], lat: coordinate[1] })
        .addTo(this.map);
      if (draggable && this.bindOnDragMaker) {
        marker.off("dragend", this.bindOnDragMaker);
        marker.on(
          "dragend",
          this.bindOnDragMaker.bind(this, marker, index, coordinates)
        );
      }
      const element = marker.getElement();
      if (this.bindOnRightClickMarker) {
        element.removeEventListener("contextmenu", this.bindOnRightClickMarker);
        element.addEventListener(
          "contextmenu",
          this.bindOnRightClickMarker.bind(this, marker, index, coordinates)
        );
      }
    });
  }
  reset() {
    this.markers.forEach((m) => {
      m.remove();
    });
    this.markers = [];
  }
  destroy() {
    this.reset();
  }
}
function getMarkerNode({
  color,
  draggable = false
}: { color?: Color; draggable?: boolean } = {}) {
  const node = document.createElement("div");
  node.style.width = "12px";
  node.style.height = "12px";
  node.style.borderRadius = "50%";
  node.style.background = "#fff";
  node.style.boxSizing = "border-box";
  node.style.border = `2px solid ${color}`;
  node.style.cursor = "pointer";
  return new Marker({
    element: node,
    draggable
  });
}
