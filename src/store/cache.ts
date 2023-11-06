const dataStore = new Map();
export const cache = {
  add: (key: string, value: any) => {
    if (dataStore.has(key)) {
      throw new Error(`Cache already contains '${key}'`);
    }
    dataStore.set(key, {
      value,
      count: 1
    });
  },
  fetch: (key: string) => {
    const cacheObj = dataStore.get(key);
    if (cacheObj) {
      cacheObj.count++;
      return cacheObj.value;
    }
  },
  release: (key: string) => {
    const cacheObj = dataStore.get(key);
    if (!cacheObj) {
      throw new Error(`No such key in cache '${key}'`);
    }
    cacheObj.count--;

    if (cacheObj.count === 0) {
      dataStore.delete(key);
    }
  }
};
