export function copyByJson<T = any>(tmp: T): T {
  return JSON.parse(JSON.stringify(tmp));
}
