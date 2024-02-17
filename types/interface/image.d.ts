export interface IconSpriteItem {
  id: string;
  name: string;
  category: "sprite";
  is_sprite: true;
  path?: string;
}
export interface IconCommonItem {
  id: string;
  name: string;
  category:
    | string
    | {
        id: string;
        name: string;
      };
  is_sprite: true;
  path?: string;
}
export declare type IconItem = IconCommonItem | IconSpriteItem;
