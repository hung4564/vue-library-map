export declare function getStore(type?: string): any;
export declare function setStore(type: string, value: any): void;
export declare function initStore<T = any>(type: string, cb: () => T): void;
