export class Section {
  constructor({renderer}, container, api) {
    this._container = container;
    this._renderer = renderer;
    this._api = api;
  }
  addItem(item) {
    this._container.prepend(item);
  }
  renderItems(data) {
    data.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}
