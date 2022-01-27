export class Section {
  constructor({data, renderer}, container) {
    this._renderedItems = data;
    this._container = container;
    this._renderer = renderer;
  }
  addItem(item) {
    this._container.prepend(item);
  }
  renderItem() {
    Array.from(this._renderedItems).forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}
