const PRINT_MAP = {};
export const initPrint = (mapId, { show, close, save, saveAll }) => {
  PRINT_MAP[mapId] = { show, close, save, saveAll };
};
export const showPrint = (mapId, { ratio = 1 } = {}) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].show({ ratio });
};
export const closePrint = (mapId) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].close();
};

export const savePrint = (mapId, cb) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].save(cb);
};
export const saveAllPrint = (mapId, cb) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].saveAll(cb);
};
