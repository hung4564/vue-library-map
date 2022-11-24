const FullScreenControl = () =>
  import("./FullScreenControl/FullScreenControl.vue");
const BaseMapControl = () => import("./BaseMapControl/BaseMapControl.vue");
const GeolocateControl = () =>
  import("./GeolocateControl/GeolocateControl.vue");
const HomeControl = () => import("./HomeControl/HomeControl.vue");
const MouseCoordinatesControl = () =>
  import("./MouseCoordinatesControl/MouseCoordinatesControl.vue");
const PrintControl = () => import("./PrintControl/PrintControl.vue");
const ZoomControl = () => import("./ZoomControl/ZoomControl.vue");
export {
  FullScreenControl,
  MouseCoordinatesControl,
  ZoomControl,
  HomeControl,
  GeolocateControl,
  BaseMapControl,
  PrintControl
};
