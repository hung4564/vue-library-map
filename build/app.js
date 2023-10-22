import "@/assets/sass/app.scss";

import {
  ActionControl,
  BaseMapControl,
  FullScreenControl,
  GeoLocateControl,
  HomeControl,
  IdentifyControl,
  LayerControl,
  Map,
  MeasurementControl,
  MouseCoordinatesControl,
  PrintControl,
  ZoomControl
} from "@components/Map";
import { CompareSettingControl, MapCompare } from "@/components/MapCompare";
import { setEventMap, useEventMap } from "@/hooks/useEvent";

import MapButton from "@components/MapButton.vue";
import MapCard from "@components/MapCard.vue";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import MapControlGroupButton from "@components/Map/control/MapControlGroupButton.vue";
import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import { useMap } from "@/components/Map/mixins/useMap";

export {
  //module
  BaseMapControl,
  FullScreenControl,
  GeoLocateControl,
  HomeControl,
  Map,
  MouseCoordinatesControl,
  ZoomControl,
  PrintControl,
  ActionControl,
  MeasurementControl,
  LayerControl,
  IdentifyControl,
  //control
  MapButton,
  MapCard,
  MapControlButton,
  MapControlGroupButton,
  //compare
  MapCompare,
  CompareSettingControl,
  //mixin
  ModuleContainer,
  ModuleMixin,
  useMap,
  //event
  useEventMap,
  setEventMap
};
