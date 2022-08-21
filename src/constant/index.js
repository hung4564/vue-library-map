import appConfig from "@app.config";

export function getGlyphs() {
  return appConfig.map.glyphsUrl;
}
export function getSprite() {
  return appConfig.map.spriteUrl;
}
