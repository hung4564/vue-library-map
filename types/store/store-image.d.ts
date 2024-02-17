export declare function addImage(
  mapId: string,
  key: string,
  image_url: string,
  option?: any
): Promise<any>;
export declare function setSprite(mapId: string, spriteUrl: string): () => void;
export declare function extractPartOfImage(
  img: HTMLImageElement,
  {
    x,
    y,
    width,
    height
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  dpi?: number
): string | undefined;
export declare function getImages(mapId: string): any;
