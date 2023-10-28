import { LayerPartContainer } from "./_default";

export class LayerViewContainer extends LayerPartContainer {
  views: any = {};
  add(key = "", view = {}) {
    this.views[key] = view;
    return this;
  }
  get(key = "") {
    return this.views[key];
  }
  runWithNameFunction(name_func: string, ...params: any[]) {
    const promises: Promise<any>[] = [];
    withViews(
      this.views,
      (view) => {
        if (view[name_func]) {
          promises.push(view[name_func](...params));
        }
      },
      this
    );

    return Promise.all(promises);
  }
}

// eslint-disable-next-line no-unused-vars
function withViews(views: any[], cb = (view: any) => {}, bind: any) {
  for (const key in views) {
    if (Object.hasOwnProperty.call(views, key)) {
      cb.bind(bind)(views[key]);
    }
  }
}